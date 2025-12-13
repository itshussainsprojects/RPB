import subprocess
import tempfile
import os
from io import BytesIO
from pathlib import Path
from latex_formatter import LatexFormatter

class PDFBuilder:
    def build_pdf(self, sections, format_type):
        formatter = LatexFormatter()
        latex_code = formatter.generate_latex(sections, format_type)

        with tempfile.TemporaryDirectory() as tempdir:
            tex_path = Path(tempdir) / "paper.tex"
            # Write LaTeX
            tex_path.write_text(latex_code, encoding="utf-8")

            # Copy any images referenced (filenames in sections['saved_images']) into tempdir
            # Images are stored in temp_images directory
            temp_images_dir = Path("temp_images")
            for s in sections.values():
                saved = s.get('saved_images') or []
                for filename in saved:
                    try:
                        src = temp_images_dir / filename
                        if src.exists():
                            dest = Path(tempdir) / filename
                            with open(src, "rb") as fr, open(dest, "wb") as fw:
                                fw.write(fr.read())
                    except Exception:
                        continue


            # Run pdflatex (twice for references if needed)
            # Don't use check=True because pdflatex can have warnings but still produce a valid PDF
            try:
                subprocess.run(["pdflatex", "-interaction=nonstopmode", "paper.tex"], cwd=tempdir, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                subprocess.run(["pdflatex", "-interaction=nonstopmode", "paper.tex"], cwd=tempdir, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            except FileNotFoundError:
                # pdflatex not found - LaTeX not installed
                error_msg = """PDF generation failed: LaTeX (pdflatex) not found.

To enable PDF generation, install LaTeX:

- On Ubuntu/Debian: sudo apt-get install texlive-full
- On macOS: brew install --cask mactex
- On Windows: Install MiKTeX from https://miktex.org/download

For now, you can use "Generate LaTeX Document" to preview the LaTeX code."""
                return error_msg.encode('utf-8')

            # Check if PDF was created (even if there were warnings)
            pdf_path = Path(tempdir) / "paper.pdf"
            if pdf_path.exists():
                return pdf_path.read_bytes()
            else:
                # PDF wasn't created - show the LaTeX log
                log_path = Path(tempdir) / "paper.log"
                if log_path.exists():
                    log_text = log_path.read_text(encoding="utf-8")
                    return f"PDF generation failed. LaTeX log:\n\n{log_text}".encode('utf-8')
                return b"PDF not produced."
