import React from 'react'
import {Background, Search, SearchIcon,SearchInput,Title,Subtitle,Group} from './styles/style'
function SearchForm({children, ...restProps}){
    return(
        <Background {...restProps}>
            {children}
            </Background>
    )
}


export default SearchForm

SearchForm.Search = function SearchFormSearch({ searchTerm, setSearchTerm, ...restProps }){
    return (
        <Search>
            <select>
                <option>buy</option>
                <option>rent</option>
            </select>
            <SearchInput
                value={searchTerm}
                onChange={({ target }) => setSearchTerm(target.value)}
                placeholder="Search houses you want"

            />
            <SearchIcon style={{ outline: 'none' }}>
                    <i className="fas fa-search"></i>
            </SearchIcon>
        </Search>
    )
} 
SearchForm.Group = function SearchGroup({children, ...restProps}){
    return <Group {...restProps}>
                {children}
            </Group>
}

SearchForm.Title = function SearchTitle({children, ...restProps}){
    return <Title {...restProps}>
                {children}
            </Title>
}

SearchForm.Subtitle = function SearchSubtitle({children, ...restProps}){
    return <Subtitle {...restProps}>
                {children}
            </Subtitle>
}