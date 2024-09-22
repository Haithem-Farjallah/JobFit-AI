import pdf from "pdf-parse/lib/pdf-parse.js";

const extractPdfData = async (path) => {
  try {
    const data = await pdf(path); // Wait for the PDF parsing to complete
    return data.text; // Return the extracted text
  } catch (error) {
    console.log(error);
    throw new Error("Failed to extract PDF data");
  }
};

export default extractPdfData;
