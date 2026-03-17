import React from 'react';
import styled from 'styled-components';

const Switch = ({
  checked,
  onChange,
  disabled = false,
  size = 'medium',
  checkedColor = '#4CAF50',
  uncheckedColor = '#ccc',
  thumbColor = '#fff',
  borderColor = 'transparent',
  ...props
}) => {
  return (
    <SwitchLabel
      size={size}
      disabled={disabled}
      checked={checked}
      checkedColor={checkedColor}
      uncheckedColor={uncheckedColor}
      borderColor={borderColor}
      {...props}
    >
      <HiddenCheckbox
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <Slider
        size={size}
        checked={checked}
        checkedColor={checkedColor}
        thumbColor={thumbColor}
      />
    </SwitchLabel>
  );
};


const SwitchLabel = styled.label`
  display: inline-block;
  position: relative;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border-radius: 6px;
  background-color: ${({ checked, checkedColor, uncheckedColor }) =>
    checked ? checkedColor : uncheckedColor};
  border: 1px solid ${({ borderColor }) => borderColor};
  transition: background-color 0.2s;
  width: ${({ size }) => {
    switch (size) {
      case 'small':
        return '40px';
      case 'large':
        return '80px';
      default:
        return '60px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'small':
        return '24px';
      case 'large':
        return '40px';
      default:
        return '30px';
    }
  }};
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  clip: rect(0 0 0 0);
`;

const Slider = styled.span`
  position: absolute;
  top: 2px;
  left: 2px;
  width: ${({ size }) => {
    switch (size) {
      case 'small':
        return '20px';
      case 'large':
        return '36px';
      default:
        return '24px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'small':
        return '20px';
      case 'large':
        return '36px';
      default:
        return '24px';
    }
  }};
  border-radius: 4px; /* внутренний ползунок чуть меньше скругления */
  background-color: ${({ thumbColor }) => thumbColor};
  transition: transform 0.2s;
  transform: ${({ checked, size }) => {
    const offset = {
      small: '18px',
      medium: '30px',
      large: '40px',
    };
    return checked ? `translateX(${offset[size]})` : 'translateX(0)';
  }};
`;

export default Switch;