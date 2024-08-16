import React from 'react'
interface TextProps {
    text: string
}

const TextWithLinks:React.FC<TextProps> = ({text}) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;

  // Разбиваем текст на части по ссылкам
  const parts = text.split(linkRegex);

  // Формируем результирующий JSX
  const result = parts.map((part, index) => {
    if (part.match(linkRegex)) {
      // Если часть текста - ссылка, возвращаем компонент 'a'
      return (
        <a className='text-blue-700' key={index} href={part} target="_blank" rel="noopener noreferrer">
          Посилання
        </a>
      );
    } else {
      // В противном случае просто возвращаем часть текста
      return <span key={index}>{part}</span>;
    }
  });

  return <>{result}</>;
}

export default TextWithLinks