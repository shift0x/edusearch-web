import index from './index.json'

const newCodeSegment = (name, address, file, source_code) => {
    const contains = (content) => {
        return content.trim().length > 3 && source_code.toLowerCase().indexOf(content.toLowerCase()) != -1
    }

    return { name, address, file, source_code, contains }
}

export function searchSmartContractCode(content){
    return index.map(item => {
        const contract = item.Contract;
        const filePath = contract.file_path ?? `/${contract.name}.sol`

        var components = [
            newCodeSegment(contract.name, item.Address, filePath, contract.source_code)
        ]

        components = components.concat(contract.additional_sources.map(source => {
            return newCodeSegment(contract.name, item.Address, source.file_path, source.source_code);
        }));

        return components.filter(code => {
            return code.contains(content)
        })
    })
    .flat()
}