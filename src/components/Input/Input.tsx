// создаем кастомный инпут, который можно переиспользовать

// определяем интерфейс инпута
interface InputProps {
  type: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// передаем необходимые свойства и методы
export const Input = ({ type, placeholder, value, onChange }: InputProps) => {
  return (
    <div className="inputContainer">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};
