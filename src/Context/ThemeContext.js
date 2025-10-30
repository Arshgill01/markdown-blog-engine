import { createContext, useState } from "react";

const ThemeContext = createContext({
  theme: 'light',
  setTheme: ()=>{}
})

export function ThemeProvider({children}){
  const [theme, setTheme] = useState('light');

  const valueToProvide = {theme, setTheme}


return(
  <ThemeContext.Provider value={valueToProvide}>
    {children}
  </ThemeContext.Provider>
)

}
export default ThemeContext;