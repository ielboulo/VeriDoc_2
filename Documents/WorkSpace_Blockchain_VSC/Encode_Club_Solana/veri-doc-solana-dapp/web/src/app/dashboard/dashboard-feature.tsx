import { AppHero } from '../ui/ui-layout';

const links: { label: string; href: string }[] = [
  { label: 'Solana Docs', href: 'https://docs.solana.com/' },
  { label: 'Solana Faucet', href: 'https://faucet.solana.com/' },
  { label: 'Solana Cookbook', href: 'https://solanacookbook.com/' },
  { label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/' },
  {
    label: 'Solana Developers GitHub',
    href: 'https://github.com/solana-developers/',
  },
];


import React, { useState, ChangeEvent } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
export default function DashboardFeature() {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [fileChosen, setFileChosen] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileChosen(true);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUploadToIPFS = () => {
    // Implement the logic to upload the file to IPFS
    // You can use libraries like ipfs-http-client for this
    // After successful upload, you may want to reset the state
    // setFile(null);
    // setFilePreview('');
    // setFileChosen(false);
  };

  return (
    <div>
      <div lang="en">
        {/* ... */}

        {/* File Input and Preview */}
        <div className="mt-4">
          <label htmlFor="fileInput" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
            Choose a PDF file
            <input
              type="file"
              accept=".pdf"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {fileChosen && (
            <div>
              <img src={filePreview} alt="File Preview" className="mt-2 max-w-full h-auto" />
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleUploadToIPFS}
              >
                Upload File to IPFS
              </button>
            </div>
          )}
        </div>

        {/* Other Content... */}
      </div>
    </div>
  );
}


// export default function DashboardFeature() {
//   return (
//     <div>
//       <div lang="en">
//       <AppHero title="VeriDoc" subtitle="Welcome to VeriDoc Solana App" />
     
//               {/* File Input and Submit Button */}
//         <div className="mt-4">
//             <input
//               type="file"
//               accept=".pdf"
//               placeholder="Choose a PDF file"
//             />
        
//           <button
//             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Submit File to IPFS
//           </button>
//           </div>


//         <div className="mt-4">
//             <input
//               type="file"
//               accept=".pdf"
//               placeholder="Choose a PDF file"
//             />
        
//           <button
//             className="mt-2 bg-blue-500 text-white px-8 py-2 rounded"
//           >
//             Verify The Doc
//           </button>
//           </div>
     
//           </div>
//           <br /><br /><br /><br /><br /><br /><br /><br /><br /> <br />

//       <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center">
//         <div className="space-y-2">
//           <p>Here are some helpful links to get you started.</p>
//           {links.map((link, index) => (
//             <div key={index}>
//               <a
//                 href={link.href}
//                 className="link"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {link.label}
//               </a>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
