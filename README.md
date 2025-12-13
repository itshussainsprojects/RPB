Research Paper Builder
----------------------
This is a minimal Streamlit app that collects paper sections, converts them to LaTeX using templates,
and compiles a PDF using pdflatex inside the container.

How to run (locally):
1. Install TeX Live (or run inside the provided Dockerfile).
2. pip install -r requirements.txt
3. streamlit run app.py

Docker:
- Build: docker-compose build
- Run: docker-compose up


Option 1 - MiKTeX (Lightweight):
    winget install MiKTeX.MiKTeX

Option 2 - TeX Live (Complete, ~4GB):
    Download from: https://www.tug.org/texlive/

Option 3 - Use Docker:
    docker-compose up