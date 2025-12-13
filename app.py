import streamlit as st
from sections import SectionManager
from layout_manager import LayoutManager
from latex_formatter import LatexFormatter
from pdf_builder import PDFBuilder
from helpers import ImageHelper
from pathlib import Path

st.set_page_config(page_title="Research Paper Builder", layout="wide")
st.title("📄 Research Paper Builder & Formatter")

# Session Storage
if "sections" not in st.session_state:
    st.session_state.sections = {}

if "format_selected" not in st.session_state:
    st.session_state.format_selected = "IEEE"

# Initialize
lm = LayoutManager()
sec = SectionManager()
formatter = LatexFormatter()
pdf_gen = PDFBuilder()

# Ensure images directory exists for temporary saving
temp_img_dir = Path("temp_images")
temp_img_dir.mkdir(exist_ok=True)

# Layout
left, right = st.columns([2.5, 1.2])

with left:
    st.header("✏️ Add Paper Sections")
    for section_name in sec.section_list:
        sec.render_section(section_name)

with right:
    st.header("🎨 Formatting Options")
    format_choice = st.radio("Choose Format", ["IEEE", "ACM", "APA", "Chicago", "MLA"])
    st.session_state.format_selected = format_choice

    st.markdown("---")
    st.subheader("📌 Actions")

    if st.button("Generate LaTeX Document"):
        # Save uploaded images (if any) to temp_images BEFORE generating LaTeX
        for sec_name, sec_content in st.session_state.sections.items():
            imgs = sec_content.get("images")
            if imgs:
                saved = ImageHelper.save_uploaded_images(imgs, temp_img_dir, section_name=sec_name)
                # update section images paths to saved filenames for LaTeX
                sec_content['saved_images'] = saved
        
        latex_code = formatter.generate_latex(st.session_state.sections, format_choice)
        st.code(latex_code, language="latex")

    if st.button("Download PDF"):
        # Save uploaded images (if any) to temp_images
        for sec_name, sec_content in st.session_state.sections.items():
            imgs = sec_content.get("images")
            if imgs:
                saved = ImageHelper.save_uploaded_images(imgs, temp_img_dir, section_name=sec_name)
                # update section images paths to saved filenames for LaTeX
                sec_content['saved_images'] = saved

        pdf_bytes = pdf_gen.build_pdf(st.session_state.sections, format_choice)
        if isinstance(pdf_bytes, bytes) and pdf_bytes.startswith(b'%PDF'):
            st.download_button(
                "Download PDF",
                pdf_bytes,
                f"{format_choice.lower()}_formatted_paper.pdf",
                "application/pdf"
            )
        else:
            # Show the actual error message returned from pdf_builder
            if isinstance(pdf_bytes, bytes):
                error_msg = pdf_bytes.decode('utf-8', errors='ignore')
                st.error(error_msg)
            else:
                st.error("PDF generation failed. Unknown error.")
