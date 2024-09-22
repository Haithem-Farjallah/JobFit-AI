// const descriptionKeyData =
//   "extract the most important skills, qualifications, technologies, and other relevant details (like years of experience, certifications) from the following description.";
// const resumeKeyData =
//   "extract the most important skills, qualifications, technologies, and other relevant details (like years of experience, certifications) from the following resume.";
// const compareData = `compare the keywords from the job description with the keywords from the candidate's resume.
//     Based on the comparison, calculate the percentage of matching keywords by dividing the number of matched keywords by the total number of keywords from the job description. show the formula used and return a value multiplied by 100 and  with 2 decimal points.   Finally, give a brief summary explaining the main matches
//     and differences between the job description and the resume.`;
// export default {
//   descriptionKeyData,
//   resumeKeyData,
//   compareData,
// };

const prompt = (data, cvText) => {
  return `I have two texts below: a job description and a candidate's resume. Please follow the instructions below carefully and return the result in a structured JSON format with the specified keys:

    1. **Extract Keywords:**
       - Extract the most important **skills, qualifications, technologies, certifications**, and other relevant details (like **years of experience**) from both texts.
       - For example: skills like "Java", "Spring Boot", "AWS", and qualifications like "3+ years of experience."
    
    2. **Match Keywords:**
       - Compare the keywords from the job description with those from the candidate's resume.
       - Count how many keywords from the **job description** appear in the **candidate’s resume**. Make sure the comparison includes exact skills, qualifications, and technologies.
    
    3. **Calculate Match Percentage:**
       - Use this formula to calculate the match percentage:
         \`(matched_keywords / total_job_description_keywords) * 100\`.
       - Show the exact formula used, and return the percentage with **two decimal places**.
    
    4. **Provide a Summary:**
       - Give a brief summary explaining the main **matches** and **differences** between the job description and the resume.
       - Mention any missing qualifications or additional qualifications the candidate has.
    
    Return the response in this exact JSON format:
    {
      "job_description_keywords": ["list of keywords from the job description"],
      "resume_keywords": ["list of keywords from the candidate's resume"],
      "matched_keywords": ["list of matching keywords"],
      "match_percentage": "calculated percentage",
      "summary": "A brief summary of the comparison"
    }
    
    Here are the texts:
    
    **Job Description:** 
    ${data.description}
    
    **Candidate's Resume:** 
    ${cvText}
    
    Follow the steps above exactly and return the response in the specified JSON format. Ensure that the match percentage is accurate and reflects the degree of similarity between the two texts.
    `;
};
export default prompt;

// const prompt = `
// I have three texts below: a job description, a candidate's resume, and a personal statement from the candidate.
// Please follow these steps and return the result in the following format:

// 1. **Extract Keywords:**
//    Extract the most important skills, qualifications, technologies, and other relevant details (like years of experience, certifications) from each of the texts.

// 2. **Match Keywords:**
//    Compare the keywords from the job description with the keywords from both the candidate's resume and personal statement. Count how many keywords match.

// 3. **Calculate Match Percentage:**
//    Based on the comparison, calculate the percentage of matching keywords by dividing the number of matched keywords by the total number of keywords from the job description. Multiply the result by 100 and return a value with two decimal points.

// 4. **Provide a Summary:**
//    Finally, give a brief summary explaining the main matches and differences between the job description, the resume, and the personal statement.

// **Job Description:**
// ${data.description}

// **Candidate's Resume:**
// ${cvText}

// **Candidate's Personal Statement:**
// ${candidateText}

// Follow the steps above to analyze the texts and return the percentage match along with your summary.
// `;
