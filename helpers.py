import os
from pathlib import Path

class TableHelper:
    @staticmethod
    def csv_to_latex(csv_text):
        if not csv_text or not csv_text.strip():
            return ""
        lines = [l for l in csv_text.strip().split("\n") if l.strip()]
        if not lines:
            return ""
        first_row = [c.strip() for c in lines[0].split(",")]
        num_cols = len(first_row)
        latex = "\\begin{center}\n"
        latex += "\\begin{tabular}{" + "|".join(["c"] * num_cols) + "}\n"
        latex += "\\hline\n"
        latex += " & ".join(first_row) + " \\\\n"
        latex += "\\hline\n"
        for line in lines[1:]:
            cells = [c.strip() for c in line.split(",")]
            if len(cells) == num_cols:
                latex += " & ".join(cells) + " \\\\n"
        latex += "\\hline\n"
        latex += "\\end{tabular}\n"
        latex += "\\end{center}"
        return latex

class ImageHelper:
    @staticmethod
    def images_to_latex(saved_paths):
        if not saved_paths:
            return ""
        latex = ""
        for i, path in enumerate(saved_paths):
            latex += "\\begin{figure}[h]\n"
            latex += "\\centering\n"
            latex += f"\\includegraphics[width=0.8\\textwidth]{{{path}}}\n"
            latex += f"\\caption{{Image {i+1}}}\n"
            latex += "\\end{figure}\n\n"
        return latex

    @staticmethod
    def save_uploaded_images(files, directory, section_name=None):
        """Save uploaded files (Streamlit UploadedFile) to the given directory.
        Returns list of saved filenames (not full paths) suitable for LaTeX includegraphics.
        """
        saved = []
        directory = Path(directory)
        directory.mkdir(parents=True, exist_ok=True)
        for i, f in enumerate(files):
            try:
                ext = os.path.splitext(f.name)[1].lower() or ".png"
                safe_name = f"{(section_name or 'image')}_{i}{ext}"
                out_path = directory / safe_name
                with open(out_path, "wb") as out:
                    out.write(f.getvalue())
                # return only the filename (not full path) for LaTeX
                saved.append(safe_name)
            except Exception:
                continue
        return saved
