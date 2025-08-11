// src/app/page.tsx
// 'use client';

// import { useState } from 'react';
// import { ApolloClient, InMemoryCache, gql, ApolloProvider, useMutation } from '@apollo/client';
// import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'; // Import the new link

// // Define the types for the data we expect from the backend
// interface Item {
//   id: string;
//   name: string;
//   quantity?: number;
// }

// interface Receipt {
//   id: string;
//   storeName: string;
//   purchaseDate: string;
//   totalAmount: number;
//   imageUrl: string;
//   items: Item[];
// }

// // Create an Apollo Link that handles file uploads
// const uploadLink = createUploadLink({
//   uri: 'http://localhost:4000/graphql',
// });

// // Configure Apollo Client to use the new link
// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: uploadLink,
// });

// // The GraphQL mutation query
// const UPLOAD_RECEIPT = gql`
//   mutation UploadReceipt($file: Upload!) {
//     uploadReceipt(file: $file) {
//       id
//       storeName
//       purchaseDate
//       totalAmount
//       imageUrl
//       items {
//         id
//         name
//         quantity
//       }
//     }
//   }
// `;

// function HomePage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [receiptData, setReceiptData] = useState<Receipt | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const [uploadReceipt, { loading }] = useMutation(UPLOAD_RECEIPT, {
//     client, // Pass the client here
//     onCompleted: (data) => {
//       if (data?.uploadReceipt) {
//         setReceiptData(data.uploadReceipt);
//       } else {
//         setError('Failed to process receipt. No data received.');
//       }
//     },
//     onError: (err) => {
//       console.error('Error uploading receipt:', err);
//       setError('Failed to process receipt. Please try again.');
//     },
//   });

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0] || null;
//     setFile(selectedFile);
//     setReceiptData(null);
//     setError(null);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

//     e.preventDefault();

//     if (!file) {
//       setError('Please select a file to upload.');
//       return;
//     }

//     console.log("DEBUG file object:", file);
//     console.log("Is File instance:", file instanceof File);
//     console.log("File name:", file?.name);
//     console.log("File type:", file?.type);
//     console.log("File size:", file?.size);

//     try {
//       await uploadReceipt({ variables: { file } });
//     } catch (err) {
//       // The onError callback handles this
//     }
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Receipt OCR & Data Extraction</h1>
//       <form onSubmit={handleSubmit} className="form">
//         <label htmlFor="file-upload" className="file-upload-label">
//           {file ? file.name : 'Choose an image file...'}
//         </label>
//         <input 
//           id="file-upload" 
//           type="file" 
//           onChange={handleFileChange} 
//           className="file-input" 
//           accept="image/jpeg, image/png"
//         />
//         <button 
//           type="submit" 
//           disabled={loading || !file} 
//           className="submit-button"
//         >
//           {loading ? 'Uploading...' : 'Upload & Process'}
//         </button>
//       </form>
//       {error && <p className="error-message">{error}</p>}
      
//       {receiptData && (
//         <div className="results-container">
//           <h2 className="results-title">Extracted Data</h2>
//           <div className="data-display">
//             <p><strong>Store Name:</strong> {receiptData.storeName}</p>
//             <p><strong>Purchase Date:</strong> {new Date(receiptData.purchaseDate).toLocaleDateString()}</p>
//             <p><strong>Total Amount:</strong> ${receiptData.totalAmount.toFixed(2)}</p>
//           </div>
//           {receiptData.imageUrl && (
//               <img src={receiptData.imageUrl} alt="Uploaded Receipt" className="receipt-image" />
//           )}
//           <h3 className="items-title">Items</h3>
//           <ul className="items-list">
//             {receiptData.items.map((item) => (
//               <li key={item.id}>
//                 {item.name} {item.quantity ? `(x${item.quantity})` : ''}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <ApolloProvider client={client}>
//       <HomePage />
//     </ApolloProvider>
//   );
// }









// 'use client';

// import { useState } from 'react';
// import { ApolloClient, InMemoryCache, gql, ApolloProvider, useMutation } from '@apollo/client';
// import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

// interface Item {
//   id: string;
//   name: string;
//   quantity?: number;
// }

// interface Receipt {
//   id: string;
//   storeName: string;
//   purchaseDate: string;
//   totalAmount: number;
//   imageUrl: string;
//   items: Item[];
// }

// // 1. Create a specialized link for uploads.
// const uploadLink = createUploadLink({
//   uri: 'http://localhost:4000/graphql',
// });

// // 2. Configure Apollo Client to use this link.
// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: uploadLink,
// });

// const UPLOAD_RECEIPT = gql`
//   mutation UploadReceipt($file: Upload!) {
//     uploadReceipt(file: $file) {
//       id
//       storeName
//       purchaseDate
//       totalAmount
//       imageUrl
//       items {
//         id
//         name
//         quantity
//       }
//     }
//   }
// `;

// function HomePage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [receiptData, setReceiptData] = useState<Receipt | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [uploadReceipt, { loading }] = useMutation(UPLOAD_RECEIPT, {
//     onCompleted: (data) => {
//       if (data?.uploadReceipt) {
//         setReceiptData(data.uploadReceipt);
//       } else {
//         setError('Failed to process receipt. No data received.');
//       }
//     },
//     onError: (err) => {
//       console.error('Error uploading receipt:', err);
//       setError(`Error uploading receipt: ${err.message}`);
//     },
//   });

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0] || null;
//     setFile(selectedFile);
//     setReceiptData(null);
//     setError(null);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please select a file to upload.');
//       return;
//     }
//     try {
//       await uploadReceipt({ variables: { file } });
//     } catch (err) {
//       // The onError callback handles this
//     }
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Receipt OCR & Data Extraction</h1>
//       <form onSubmit={handleSubmit} className="form">
//       {/* Change this section */}
//       <input 
//         type="file" 
//         onChange={handleFileChange} 
//         accept="image/jpeg, image/png"
//       />
//       {/* End of changed section */}
//       <button 
//         type="submit" 
//         disabled={loading || !file} 
//         className="submit-button"
//       >
//         {loading ? 'Uploading...' : 'Upload & Process'}
//       </button>
//     </form>
//       {error && <p className="error-message">{error}</p>}
      
//       {receiptData && (
//         <div className="results-container">
//           <h2 className="results-title">Extracted Data</h2>
//           <div className="data-display">
//             <p><strong>Store Name:</strong> {receiptData.storeName}</p>
//             <p><strong>Purchase Date:</strong> {new Date(receiptData.purchaseDate).toLocaleDateString()}</p>
//             <p><strong>Total Amount:</strong> ${receiptData.totalAmount.toFixed(2)}</p>
//           </div>
//           {receiptData.imageUrl && (
//               <img src={receiptData.imageUrl} alt="Uploaded Receipt" className="receipt-image" />
//           )}
//           <h3 className="items-title">Items</h3>
//           <ul className="items-list">
//             {receiptData.items.map((item) => (
//               <li key={item.id}>
//                 {item.name} {item.quantity ? `(x${item.quantity})` : ''}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <ApolloProvider client={client}>
//       <HomePage />
//     </ApolloProvider>
//   );
// }



// // src/app/page.tsx
// 'use client';

// import { useState } from 'react';
// import { ApolloClient, InMemoryCache, gql, ApolloProvider, useMutation } from '@apollo/client';
// import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

// interface Item {
//   id: string;
//   name: string;
//   quantity?: number;
// }

// interface Receipt {
//   id: string;
//   storeName: string;
//   purchaseDate: string;
//   totalAmount: number;
//   imageUrl: string;
//   items: Item[];
// }

// const uploadLink = createUploadLink({
//   uri: 'http://localhost:4000/graphql',
// });

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: uploadLink,
// });

// const UPLOAD_RECEIPT = gql`
//   mutation UploadReceipt($file: Upload!) {
//     uploadReceipt(file: $file) {
//       id
//       storeName
//       purchaseDate
//       totalAmount
//       imageUrl
//       items {
//         id
//         name
//         quantity
//       }
//     }
//   }
// `;

// function HomePage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [receiptData, setReceiptData] = useState<Receipt | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const [uploadReceipt, { loading }] = useMutation(UPLOAD_RECEIPT, {
//     onCompleted: (data) => {
//       if (data?.uploadReceipt) {
//         setReceiptData(data.uploadReceipt);
//       } else {
//         setError('Failed to process receipt. No data received.');
//       }
//     },
//     onError: (err) => {
//       console.error('Error uploading receipt:', err);
//       setError('Failed to process receipt. Please try again.');
//     },
//   });

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // ❌ The file variable is coming from the form, not the state.
//     const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
//     const file = fileInput.files?.[0];

//     if (!file) {
//       setError('Please select a file to upload.');
//       return;
//     }

//     try {
//       await uploadReceipt({ variables: { file } });
//     } catch (err) {
//       // The onError callback handles this
//     }
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Receipt OCR & Data Extraction</h1>
//       <form onSubmit={handleSubmit} className="form">
//         <input
//           id="file-upload"
//           type="file"
//           className="file-input"
//           accept="image/jpeg, image/png"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="submit-button"
//         >
//           {loading ? 'Uploading...' : 'Upload & Process'}
//         </button>
//       </form>
//       {error && <p className="error-message">{error}</p>}
//       {/* ... rest of the component */}
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <ApolloProvider client={client}>
//       <HomePage />
//     </ApolloProvider>
//   );
// }


// src/app/page.tsx
// 'use client';

// import { useState } from 'react';
// import { ApolloClient, InMemoryCache, gql, ApolloProvider, useMutation } from '@apollo/client';
// import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

// interface Item {
//   id: string;
//   name: string;
//   quantity?: number;
// }

// interface Receipt {
//   id: string;
//   storeName: string;
//   purchaseDate: string;
//   totalAmount: number;
//   imageUrl: string;
//   items: Item[];
// }

// const uploadLink = createUploadLink({
//   uri: 'http://localhost:4000/graphql',
// });

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: uploadLink,
// });

// const UPLOAD_RECEIPT = gql`
//   mutation UploadReceipt($file: Upload!) {
//     uploadReceipt(file: $file) {
//       id
//       storeName
//       purchaseDate
//       totalAmount
//       imageUrl
//       items {
//         id
//         name
//         quantity
//       }
//     }
//   }
// `;

// function HomePage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [receiptData, setReceiptData] = useState<Receipt | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const [uploadReceipt, { loading }] = useMutation(UPLOAD_RECEIPT, {
//     onCompleted: (data) => {
//       if (data?.uploadReceipt) {
//         setReceiptData(data.uploadReceipt);
//       } else {
//         setError('Failed to process receipt. No data received.');
//       }
//     },
//     onError: (err) => {
//       console.error('Error uploading receipt:', err);
//       setError('Failed to process receipt. Please try again.');
//     },
//   });

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
//     const selectedFile = fileInput.files?.[0];

//     if (!selectedFile) {
//       setError('Please select a file to upload.');
//       return;
//     }

//     try {
//       await uploadReceipt({ variables: { file: selectedFile } });
//     } catch (err) {
//       // The onError callback handles this
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0] || null;
//     setFile(selectedFile);
//     setReceiptData(null);
//     setError(null);
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Receipt OCR & Data Extraction</h1>
//       <form onSubmit={handleSubmit} className="form">
//         {/* Hidden file input, styled by the label */}
//         <input 
//           id="file-upload" 
//           type="file" 
//           onChange={handleFileChange} 
//           className="file-input" 
//           accept="image/jpeg, image/png" 
//         />
//         {/* Visible label that triggers the hidden input */}
//         <label htmlFor="file-upload" className="file-upload-label">
//           {file ? file.name : 'Choose an image file...'}
//         </label>
//         <button 
//           type="submit" 
//           disabled={loading || !file} 
//           className="submit-button"
//         >
//           {loading ? 'Uploading...' : 'Upload & Process'}
//         </button>
//       </form>
//       {error && <p className="error-message">{error}</p>}
      
//       {receiptData && (
//         <div className="results-container">
//           <h2 className="results-title">Extracted Data</h2>
//           <div className="data-display">
//             <p><strong>Store Name:</strong> {receiptData.storeName}</p>
//             <p><strong>Purchase Date:</strong> {new Date(receiptData.purchaseDate).toLocaleDateString()}</p>
//             <p><strong>Total Amount:</strong> ${receiptData.totalAmount.toFixed(2)}</p>
//           </div>
//           {receiptData.imageUrl && (
//               <img src={receiptData.imageUrl} alt="Uploaded Receipt" className="receipt-image" />
//           )}
//           <h3 className="items-title">Items</h3>
//           <ul className="items-list">
//             {receiptData.items.map((item) => (
//               <li key={item.id}>
//                 {item.name} {item.quantity ? `(x${item.quantity})` : ''}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <ApolloProvider client={client}>
//       <HomePage />
//     </ApolloProvider>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import { ApolloClient, InMemoryCache, gql, ApolloProvider, useMutation } from '@apollo/client';
// import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

// interface Item {
//   id: string;
//   name: string;
//   quantity?: number;
// }

// interface Receipt {
//   id: string;
//   storeName: string;
//   purchaseDate: string;
//   totalAmount: number;
//   imageUrl: string;
//   items: Item[];
// }

// const uploadLink = createUploadLink({
//   uri: 'http://localhost:4000/graphql',
// });

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: uploadLink,
// });

// const UPLOAD_RECEIPT = gql`
//   mutation UploadReceipt($file: Upload!) {
//     uploadReceipt(file: $file) {
//       id
//       storeName
//       purchaseDate
//       totalAmount
//       imageUrl
//       items {
//         id
//         name
//         quantity
//       }
//     }
//   }
// `;

// function HomePage() {
//   const [file, setFile] = useState<File | null>(null);
//   const [receiptData, setReceiptData] = useState<Receipt | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const [uploadReceipt, { loading }] = useMutation(UPLOAD_RECEIPT, {
//     onCompleted: (data) => {
//       if (data?.uploadReceipt) {
//         setReceiptData(data.uploadReceipt);
//       } else {
//         setError('Failed to process receipt. No data received.');
//       }
//     },
//     onError: (err) => {
//       console.error('Error uploading receipt:', err);
//       setError('Failed to process receipt. Please try again.');
//     },
//   });

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
//     const fileToUpload = fileInput.files?.[0];

//     if (!fileToUpload) {
//       setError('Please select a file to upload.');
//       return;
//     }

//     try {
//       await uploadReceipt({ variables: { file: fileToUpload } });
//     } catch (err) {
//       // The onError callback handles this
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0] || null;
//     setFile(selectedFile);
//     setReceiptData(null);
//     setError(null);
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Receipt OCR & Data Extraction</h1>
//       <form onSubmit={handleSubmit} className="form">
//         <input
//           id="file-upload"
//           type="file"
//           onChange={handleFileChange}
//           className="file-input"
//           accept="image/jpeg, image/png"
//         />
//         <label htmlFor="file-upload" className="file-upload-label">
//           {file ? file.name : 'Choose an image file...'}
//         </label>
//         <button
//           type="submit"
//           disabled={loading || !file}
//           className="submit-button"
//         >
//           {loading ? 'Uploading...' : 'Upload & Process'}
//         </button>
//       </form>
//       {error && <p className="error-message">{error}</p>}

//       {receiptData && (
//         <div className="results-container">
//           <h2 className="results-title">Extracted Data</h2>
//           <div className="data-display">
//             <p><strong>Store Name:</strong> {receiptData.storeName}</p>
//             <p><strong>Purchase Date:</strong> {new Date(receiptData.purchaseDate).toLocaleDateString()}</p>
//             <p><strong>Total Amount:</strong> ${receiptData.totalAmount.toFixed(2)}</p>
//           </div>
//           {receiptData.imageUrl && (
//               <img src={receiptData.imageUrl} alt="Uploaded Receipt" className="receipt-image" />
//           )}
//           <h3 className="items-title">Items</h3>
//           <ul className="items-list">
//             {receiptData.items.map((item) => (
//               <li key={item.id}>
//                 {item.name} {item.quantity ? `(x${item.quantity})` : ''}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <ApolloProvider client={client}>
//       <HomePage />
//     </ApolloProvider>
//   );
// }

'use client';

import { useState, useRef } from 'react';
import { ApolloClient, InMemoryCache, gql, ApolloProvider, useMutation } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

interface Item {
  id: string;
  name: string;
  quantity?: number;
}

interface Receipt {
  id: string;
  storeName: string;
  purchaseDate: string;
  totalAmount: number;
  imageUrl: string;
  items: Item[];
}

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: uploadLink,
});

const UPLOAD_RECEIPT = gql`
  mutation UploadReceipt($file: Upload!) {
    uploadReceipt(file: $file) {
      id
      storeName
      purchaseDate
      totalAmount
      imageUrl
      items {
        id
        name
        quantity
      }
    }
  }
`;

function HomePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Use useState to store the selected file and trigger a re-render
  const [file, setFile] = useState<File | null>(null);
  const [receiptData, setReceiptData] = useState<Receipt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [uploadReceipt] = useMutation(UPLOAD_RECEIPT, {
    onCompleted: (data) => {
      setLoading(false);
      if (data?.uploadReceipt) {
        setReceiptData(data.uploadReceipt);
      } else {
        setError('Failed to process receipt. No data received.');
      }
    },
    onError: (err) => {
      setLoading(false);
      console.error('Error uploading receipt:', err);
      setError('Failed to process receipt. Please try again.');
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedFile = fileInputRef.current?.files?.[0];

    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    try {
      await uploadReceipt({ variables: { file: selectedFile } });
    } catch (err) {
      // The onError callback handles this
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    // Update the state to trigger a re-render
    setFile(selectedFile); 
    setReceiptData(null);
    setError(null);
  };

  return (
    <div className="container">
      <h1 className="title">Receipt OCR & Data Extraction</h1>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="file-upload" className="file-upload-label">
          {file ? file.name : 'Choose an image file...'}
        </label>
        <input 
          id="file-upload" 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} // Link the change handler here
          className="file-input" 
          accept="image/jpeg, image/png"
        />
        <button 
          type="submit" 
          disabled={loading || !file} // Now the button correctly uses the state
          className="submit-button"
        >
          {loading ? 'Uploading...' : 'Upload & Process'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
      
      {receiptData && (
        <div className="results-container">
          <h2 className="results-title">Extracted Data</h2>
          <div className="data-display">
            <p><strong>Store Name:</strong> {receiptData.storeName}</p>
            <p><strong>Purchase Date:</strong> {new Date(receiptData.purchaseDate).toLocaleDateString()}</p>
            <p><strong>Total Amount:</strong> ${receiptData.totalAmount.toFixed(2)}</p>
          </div>
          {receiptData.imageUrl && (
              <img src={receiptData.imageUrl} alt="Uploaded Receipt" className="receipt-image" />
          )}
          <h3 className="items-title">Items</h3>
          <ul className="items-list">
            {receiptData.items.map((item) => (
              <li key={item.id}>
                {item.name} {item.quantity ? `(x${item.quantity})` : ''}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <HomePage />
    </ApolloProvider>
  );
}