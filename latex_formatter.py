import os
import re
from pathlib import Path

class LatexFormatter:
    def __init__(self):
        self.templates_dir = Path("templates")
        self._ensure_templates()

    def _ensure_templates(self):
        if not self.templates_dir.exists():
            self.templates_dir.mkdir(parents=True, exist_ok=True)
        
        # Always check/update/create templates
        self._create_default_templates()

    def _create_default_templates(self):
        templates = {
            "ieee": self._get_ieee_template(),
            "acm": self._get_acm_template(),
            "apa": self._get_apa_template(),
            "chicago": self._get_chicago_template(),
            "mla": self._get_mla_template()
        }
        for name, content in templates.items():
            with open(self.templates_dir / f"{name}_template.tex", "w", encoding="utf-8") as f:
                f.write(content)

    def _get_ieee_template(self):
        return r"""\documentclass[conference]{IEEEtran}
\usepackage[utf8]{inputenc}
\usepackage{graphicx}
\usepackage{booktabs}
\usepackage{amsmath}
\usepackage{hyperref}

\title{__TITLE__}
\author{Author Name}
\date{\today}

\begin{document}

\maketitle

\begin{abstract}
__ABSTRACT__
\end{abstract}

\section{Introduction}
__LITERATURE_REVIEW__

\section{Methodology}
__METHODOLOGY__

\section{Results}
__RESULTS__

\section{Discussion}
__DISCUSSION__

\section{Conclusion}
__CONCLUSION__

\section*{References}
__REFERENCES__

\appendix
__APPENDIX__

\end{document}"""

    def _get_acm_template(self):
        return r"""\documentclass[sigconf]{acmart}
\usepackage[utf8]{inputenc}
\usepackage{graphicx}
\usepackage{booktabs}

\title{__TITLE__}
\author{Author Name}
\date{\today}

\begin{document}

\maketitle

\begin{abstract}
__ABSTRACT__
\end{abstract}

\section{Introduction}
__LITERATURE_REVIEW__

\section{Methodology}
__METHODOLOGY__

\section{Results}
__RESULTS__

\section{Discussion}
__DISCUSSION__

\section{Conclusion}
__CONCLUSION__

\section*{References}
__REFERENCES__

\appendix
__APPENDIX__

\end{document}"""

    def _get_apa_template(self):
        return r"""\documentclass[12pt]{article}
\usepackage[utf8]{inputenc}
\usepackage{graphicx}
\usepackage{booktabs}
\usepackage{setspace}
\usepackage{geometry}
\geometry{letterpaper, margin=1in}

\doublespacing
\title{__TITLE__}
\author{Author Name}
\date{\today}

\begin{document}

\maketitle

\begin{abstract}
__ABSTRACT__
\end{abstract}

\section{Introduction}
__LITERATURE_REVIEW__

\section{Methodology}
__METHODOLOGY__

\section{Results}
__RESULTS__

\section{Discussion}
__DISCUSSION__

\section{Conclusion}
__CONCLUSION__

\section*{References}
__REFERENCES__

\appendix
__APPENDIX__

\end{document}"""

    def _get_chicago_template(self):
        return r"""\documentclass[12pt]{article}
\usepackage[utf8]{inputenc}
\usepackage{graphicx}
\usepackage{booktabs}
\usepackage{setspace}
\usepackage{geometry}
\geometry{letterpaper, margin=1in}

\title{__TITLE__}
\author{Author Name}
\date{\today}

\begin{document}

\maketitle

\begin{abstract}
__ABSTRACT__
\end{abstract}

\section{Introduction}
__LITERATURE_REVIEW__

\section{Methodology}
__METHODOLOGY__

\section{Results}
__RESULTS__

\section{Discussion}
__DISCUSSION__

\section{Conclusion}
__CONCLUSION__

\section*{Bibliography}
__REFERENCES__

\appendix
__APPENDIX__

\end{document}"""

    def _get_mla_template(self):
        return r"""\documentclass[12pt]{article}
\usepackage[utf8]{inputenc}
\usepackage{graphicx}
\usepackage{booktabs}
\usepackage{setspace}
\usepackage{geometry}
\geometry{letterpaper, margin=1in}
\usepackage{fancyhdr}

\pagestyle{fancy}
\fancyhf{}
\rhead{Author Name \thepage}
\renewcommand{\headrulewidth}{0pt}

\doublespacing
\title{__TITLE__}
\author{Author Name}
\date{\today}

\begin{document}

\begin{center}
\textbf{__TITLE__}
\end{center}

Author Name

My Professor

Class Name

\today

\section{Introduction}
__LITERATURE_REVIEW__

\section{Methodology}
__METHODOLOGY__

\section{Results}
__RESULTS__

\section{Discussion}
__DISCUSSION__

\section{Conclusion}
__CONCLUSION__

\section*{Works Cited}
__REFERENCES__

\appendix
__APPENDIX__

\end{document}"""

    def load_template(self, format_name):
        try:
            format_lower = format_name.lower().strip()
            path = self.templates_dir / f"{format_lower}_template.tex"
            if path.exists():
                return path.read_text(encoding="utf-8")
            else:
                return self._get_ieee_template()
        except Exception:
            return self._get_ieee_template()

    def generate_latex(self, sections, format_name):
        latex = self.load_template(format_name)

        if not sections:
            return latex

        # Import helpers here to avoid circular imports at app import time
        try:
            from helpers import TableHelper, ImageHelper
        except Exception:
            # minimal fallback
            class TableHelper:
                @staticmethod
                def csv_to_latex(csv_text):
                    return ''

            class ImageHelper:
                @staticmethod
                def images_to_latex(paths):
                    return ''

        for key, content in sections.items():
            if not content:
                continue
            text = content.get("text", "") or ""
            
            # Title section should ONLY contain text (no tables/images)
            if key.upper() == "TITLE":
                combined = text.strip() if text.strip() else ""
            else:
                # Other sections can have tables and images
                table_latex = ''
                if content.get('table'):
                    table_latex = TableHelper.csv_to_latex(content['table'])
                images_latex = ''
                # prefer saved_images paths if present (strings)
                saved = content.get('saved_images') or []
                # if saved contains UploadedFile objects, skip them (they should be saved first)
                if isinstance(saved, (list, tuple)) and saved and all(isinstance(s, str) for s in saved):
                    # saved should be list of paths (strings)
                    images_latex = ImageHelper.images_to_latex(saved)
                combined = ''
                if text.strip():
                    combined += text.strip() + '\n\n'
                if table_latex.strip():
                    combined += table_latex.strip() + '\n\n'
                if images_latex.strip():
                    combined += images_latex.strip() + '\n\n'
            
            placeholder = key.upper().replace(' ', '_')
            latex = latex.replace(f"__{placeholder}__", combined.strip())

        # remove any remaining placeholders
        latex = re.sub(r'__[A-Z_]+__', '', latex)
        return latex
