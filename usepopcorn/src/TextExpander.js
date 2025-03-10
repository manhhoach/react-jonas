import { useState } from 'react';
import './style.css'

export default function TextExpander({
  collapsedNumWords = 50, expandButtonText = "Show more",
  collapseButtonText = "Collapse",
  buttonColor = "blue",
  expanded = false, className = '',
  children
}) {
  const [isShow, setIsShow] = useState(expanded)
  let limitedText = (children.length > collapsedNumWords && !isShow) ? children.substring(0, collapsedNumWords) + "..." : children;

  const buttonStyle = {
    color: buttonColor,
    border: 'none',
    cursor: 'pointer'
  }

  return <div className={`${className}`}>
    <span> {limitedText}</span>
    {' '}
    <button style={buttonStyle} onClick={() => setIsShow(prev => !prev)}>{isShow ? collapseButtonText : expandButtonText}</button>

  </div>;
}