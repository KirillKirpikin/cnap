import React, { ChangeEvent, useEffect, useState } from 'react'
import styled from './file-upload.module.scss';
interface FileUploadProps {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  quantity: number
}

const FileUpload: React.FC<FileUploadProps> = ({selectedFiles, setSelectedFiles, quantity}) => {
  const [isError, setIsError] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setIsError(false)
    e.preventDefault();
    const files = e.target.files;

    if(files && files.length > 0){
      if (selectedFiles.length + files.length > quantity) {
        setIsError(true)
        return;
      }
      const fileArray = Array.from(files)
      setSelectedFiles((prevFiles)=> [...prevFiles , ...fileArray])
    } 
  }

  const handleRemoveFile = (fileName: string) =>{
    setSelectedFiles((prevFiles: File[])=> prevFiles.filter((file)=> file.name + file.size !== fileName))
  }

  useEffect(()=>{
  },[selectedFiles])
  return (
    <div className={styled.file}>
      <label className={styled.label}>
        <svg xmlns="http://www.w3.org/2000/svg" width="31" height="35" viewBox="0 0 31 35" fill="none">
            <path d="M27.8344 1.96941C26.6078 1.09131 25.0826 0.736343 23.5943 0.982567C22.106 1.22879 20.7764 2.05604 19.8979 3.2824L5.54592 23.3187C5.21934 23.7513 4.98266 24.245 4.84982 24.7706C4.71698 25.2961 4.69067 25.843 4.77243 26.3788C4.8542 26.9147 5.04239 27.4288 5.32592 27.8909C5.60945 28.3529 5.98258 28.7535 6.42333 29.0691C6.86408 29.3847 7.36354 29.6089 7.89228 29.7285C8.42102 29.8481 8.96834 29.8606 9.502 29.7654C10.0357 29.6702 10.5449 29.4691 10.9996 29.1741C11.4544 28.879 11.8455 28.496 12.1499 28.0474L22.2834 13.9018L20.9623 12.9544L10.8304 27.1033C10.4537 27.628 9.88438 27.9819 9.24718 28.0876C8.60997 28.1933 7.95686 28.0421 7.43092 27.6672C6.90583 27.2899 6.55188 26.7197 6.44677 26.0817C6.34167 25.4438 6.49398 24.7902 6.87029 24.2644L21.219 4.22816H21.2223L21.219 4.2249C21.8483 3.35045 22.7984 2.76097 23.8613 2.58554C24.9243 2.41011 26.0134 2.66302 26.8903 3.2889C27.7647 3.91815 28.3542 4.86826 28.5297 5.9312C28.7051 6.99415 28.4522 8.08329 27.8263 8.96016V8.95691L12.0963 30.9204C11.2169 32.1455 9.88776 32.972 8.40007 33.2187C6.91237 33.4654 5.38755 33.1123 4.1598 32.2367C2.9349 31.3562 2.10904 30.0261 1.86322 28.5378C1.6174 27.0495 1.97169 25.5244 2.84842 24.2969L14.2803 8.33616L12.9592 7.3904L1.5273 23.3512C0.968092 24.1317 0.568202 25.0148 0.350484 25.95C0.132766 26.8852 0.101488 27.8542 0.258439 28.8014C0.41539 29.7487 0.757492 30.6558 1.26519 31.4708C1.77289 32.2858 2.43623 32.9928 3.21729 33.5513C3.99739 34.111 4.88017 34.5115 5.81515 34.7298C6.75013 34.9482 7.71898 34.9801 8.6663 34.8237C9.61362 34.6674 10.5208 34.3258 11.3361 33.8186C12.1513 33.3114 12.8586 32.6485 13.4174 31.8678L29.1474 9.90428C30.0247 8.67736 30.3788 7.1523 30.132 5.66435C29.8852 4.1764 29.0576 2.84737 27.8312 1.96941H27.8344Z" fill="black"/>
        </svg>  
        <input onChange={handleChange} type="file" className={styled.input} multiple={true}/>
      </label>
      {selectedFiles.length > 0 && (
        <ul className={styled.list}>
          {selectedFiles.map((file)=>(
            <li key={file.name + file.size}>
              <span>{file.name}</span>
              <button onClick={()=> {                  
                handleRemoveFile(file.name + file.size);
              }}>удалить</button>
            </li>
          ))}
        </ul>
      )}
      {isError && <div className={styled.max} >{`Не більше ${quantity=== 1 ? 'одного файлу' :  `${quantity} файлів`} `}</div>}        
    </div>
  )
}

export default FileUpload;