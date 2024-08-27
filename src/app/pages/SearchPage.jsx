import { Accordion, AccordionDetails, AccordionSummary, Box, Input, Typography } from '@mui/material';
import { searchSmartContractCode } from '../../features/smart-contract-search/search'
import { useEffect, useState } from 'react';
import Hero from '../../components/Hero';
import Editor from '@monaco-editor/react';

import 'monaco-editor/min/vs/editor/editor.main.css';
import { ExpandMore } from '@mui/icons-material';

const editorTheme = {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
        'editor.background': '#efefef',
    },
}


const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [activePageResults, setActivePageResults] = useState([]);
    const [pendingSearchQuery, setPendingSearchQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    
    useEffect(() => {
        setSearchResults([])

        if(searchQuery){
            setPendingSearchQuery(searchQuery)
        }
    }, [searchQuery])

    useEffect(() => {
        const results = searchSmartContractCode(pendingSearchQuery);
        const searchResultsByContract = {}

        results.forEach(match => {
            if(!searchResultsByContract[match.address])
                searchResultsByContract[match.address] = { address: match.address, name: match.name, matches: []}

            searchResultsByContract[match.address].matches.push(match);
        })

        const searchResultModels = Object.keys(searchResultsByContract).map(key => { return searchResultsByContract[key]});

        setSearchResults(searchResultModels)
    }, [pendingSearchQuery])

    useEffect(() => {
        const end = pageNumber*10
        const start = end - 10;
        const pageResults = searchResults.slice(start, end-1);

        setActivePageResults(pageResults)
    }, [searchResults, pageNumber])


    return (
        <>
            <Hero />

            <Input key="search-input" 
                type='text' 
                value={searchQuery}
                placeholder="enter at least 3 characters to search"
                sx={{
                    width: "80%",
                    ml: "10%",
                    padding: 1,
                    pl: 2,
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    boxShadow: '0 1px 6px rgba(32,33,36,0.28)',
                    '&:hover, &.Mui-focused': {
                        boxShadow: '0 1px 6px rgba(32,33,36,0.28)',
                    },
                    '&:before, &:after': {
                        borderBottom: 'none !important',
                    },
                    '& .MuiOutlinedInput-input': {
                        padding: '12px 16px',
                    },
                    '& fieldset': {
                        border: 'none',
                    },
                }}
                onChange={(e) => { setSearchQuery(e.target.value) }} />

            { 
                activePageResults.map(result => (
                    <>
                        <Box sx={{
                            display: "inline-flex",
                            mt: 3,
                            padding: 2
                        }}>
                            <Typography sx={{
                                padding: 1,
                                backgroundColor: "#efefef",
                                borderRadius: "8px"
                            }}
                                key={`${result.address}_${result.file}`}>
                                { `${result.name} - ${ result.address }` }
                            </Typography>
                        </Box>
                    

                        <>
                        {
                            result.matches.map(match => (
                                <Box sx={{
                                    width: "90%",
                                    ml: "5%"
                                }}>
                                    <Accordion elevation={0} sx={{
                                        mt: 1,
                                        mb: 1,
                                        border: "1px solid #dedede"

                                    }}>
                                        <AccordionSummary 
                                            sx={{
                                                padding: "2px",
                                                minHeight: "unset",
                                                '& .MuiAccordionSummary-content': {
                                                    margin: '0px',
                                                },
                                            }}
                                            expandIcon={<ExpandMore />}>
                                            { match.file }
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Editor height="450px" 
                                                language='solidity' 
                                                theme={editorTheme}
                                                value={match.source_code} 
                                                options={{
                                                    theme: editorTheme,
                                                readOnly: true
                                            }} />
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            ))
                        }
                        </>
                    </>
                    
                ))
            }
        </>
    )
}

export default SearchPage