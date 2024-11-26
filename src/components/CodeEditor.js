import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import PropTypes from 'prop-types';
import 'codemirror/lib/codemirror.css';
// Import language modes
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
// Import themes if desired
// import 'codemirror/theme/material.css';

const CodeEditor = ({ language }) => {
    const [code, setCode] = useState('');
    const modeMap = {
        'JAVA': 'text/x-java',
        'PYTHON': 'python',
        'C_CPP': 'text/x-c++src',
        'JAVASCRIPT': 'javascript',
        // Add more mappings as needed
    };

    return (
        <Box className="code-editor" width="100%" height="100%" borderWidth="1px" borderRadius="md" overflow="hidden">
            <CodeMirror
                value={code}
                options={{
                    mode: modeMap[language] || 'javascript',
                    theme: 'material',
                    lineNumbers: true,
                    indentUnit: 4,
                    tabSize: 4,
                    indentWithTabs: false,
                }}
                onBeforeChange={(editor, data, value) => {
                    setCode(value);
                }}
            />
        </Box>
    );
};

CodeEditor.propTypes = {
    language: PropTypes.string.isRequired,
};

export default CodeEditor;