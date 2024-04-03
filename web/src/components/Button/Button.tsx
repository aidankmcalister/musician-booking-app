const Button = ({ className = '', onClick, children }) => {
  return (
    <button
      className={`rounded-md border bg-main-orange px-2 py-1 font-medium text-white hover:bg-main-orange/70 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
