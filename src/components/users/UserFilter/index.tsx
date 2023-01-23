import { FilterFilled, SearchOutlined } from '@ant-design/icons'
import { Collapse, Input } from 'antd'
import React, { useState } from 'react'
import useWindowSize from '../../../hooks/utils/useWindowSize';

interface UserFilterProps {
    setFilters  : React.Dispatch<React.SetStateAction<{}>>;
    setPage     : React.Dispatch<React.SetStateAction<number>>;
}

export const UserFilter = ( { setFilters, setPage }: UserFilterProps ) => {

    const { Panel } = Collapse;
    const { width } = useWindowSize();

    const [ activeFilter, setActiveFilter ] = useState( false );

    const onChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const { value } = e.target;

        // Estructure for the custom filter OR-CONDITIONAL
        const body = {
            "or": {
                "query": value,
            }
        }
        setFilters( body );
        setPage ( 1 );
    }

    return (
        <div>
            <div>
                <Input
                    prefix = {<SearchOutlined />}
                    placeholder = "Nombres, apellidos o documento..."
                    size = { width < 768 ? "middle": "large" }
                    onChange = { onChange }
                />
            </div>
            <Collapse
                bordered = {false}
                expandIcon = {({ isActive }) => <FilterFilled rotate = { isActive ? 90 : 0 } />}
                className = "site-collapse-custom-collapse"
                style = {{ backgroundColor: "transparent", padding:"0.5rem 0" }}
            >
                <Panel header = "Agregar filtros" key = "1" className = "site-collapse-custom-panel">
                    <div>
                        Filtros pendientes...
                    </div>
                </Panel>
            </Collapse>
        </div>
    )
}
