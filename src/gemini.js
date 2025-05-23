// const apiKey = PropertiesService.getScriptProperties().getProperty('AIzaSyCZW-6QpAS5Ez6QiCVi_ypllG0V8sFWnPo');

// async function main(prompt) {
//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 65536,
//     responseMimeType: 'text/plain',
//   };

//   const data = {
//     generationConfig,
//     contents: [
//       {
//         role: 'user',
//         parts: [
//           { text: prompt },
//         ],
//       },
//     ],
//   };

//   const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-05-06:generateContent?key=${apiKey}`;
//   const options = {
//     method: 'POST',
//     contentType: 'application/json',
//     payload: JSON.stringify(data)
//   };

//   const response = UrlFetchApp.fetch(url, options);                              
//   console.log(response.getContentText());
// }

// export default main;