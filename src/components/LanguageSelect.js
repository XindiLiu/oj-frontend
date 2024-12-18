import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, Select } from '@chakra-ui/react';

const LanguageSelect = ({ selectedLanguage, onChange }) => (

    <Select maxWidth="200px" value={selectedLanguage} onChange={onChange}>
        <option value="CPP">C++</option>
        <option value="C">C</option>
        <option value="JAVA">Java</option>
        <option value="PYTHON">Python</option>

        {/* Add more languages as needed */}
    </Select>

);

LanguageSelect.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default LanguageSelect;