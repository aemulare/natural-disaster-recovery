import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup, FormControl, ControlLabel } from 'react-bootstrap';

const SelectField = (
  {
    label, selectedValue, placeholder, options, onSelect, disabled, valueGetter
  }
) => (
  <FormGroup>
    <ControlLabel>{label}</ControlLabel>
    <InputGroup>
      <FormControl
        componentClass="select"
        placeholder={placeholder}
        value={selectedValue}
        disabled={disabled}
        onChange={onSelect}
      >
        {
          options.map(opt => (<option key={opt.id} value={valueGetter(opt)}>{opt.name}</option>))
        }
      </FormControl>
    </InputGroup>
  </FormGroup>
);

SelectField.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  selectedValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  valueGetter: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

SelectField.defaultProps = {
  disabled: false
};

export default SelectField;
