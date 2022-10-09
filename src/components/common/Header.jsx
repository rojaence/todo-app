import { useContext } from 'react'
import ThemeContext from '../../context/theme/ThemeContext'
import Button from './Button'

function Header() {

  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const customStyle = {
    width: '50px',
    height: '50px',
  }

  return (
    <header className="header">
      <h1 className="title">TODO</h1>
      <Button customStyle={ customStyle } fab onClick={ toggleDarkMode } icon={ darkMode ? 'sun' : 'moon' } iconSize={ 30 }/>
    </header>
  )
}

export default Header
