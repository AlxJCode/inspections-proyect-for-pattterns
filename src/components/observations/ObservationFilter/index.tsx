import { Button, DatePicker, Form, Select } from 'antd';
import React, { useEffect } from 'react';
import { useAxiosArea } from '../../../hooks/users/useAxiosArea';
import { useAxiosUser } from '../../../hooks/users/useAxiosUser';

interface Props {
    setFilters  : React.Dispatch<React.SetStateAction<{}>>;
    setPage     : React.Dispatch<React.SetStateAction<number>>;
}

export const ObservationFilter = ({ setFilters, setPage }: Props) => {

    const [ form ] = Form.useForm();
    const { RangePicker } = DatePicker;
    const { users, getFiltered: getFilteredU, loading: loadingU } = useAxiosUser();
    const { areas, getFiltered: getFilteredA, loading: loadingA } = useAxiosArea();

    const onFinish = ( values: any ) => {

        let filters:any = {

        };

        if ( values.datetime ) {
            filters[ 'datetime__range' ] = [ ...values.datetime ]
        }
        if ( values.userId ) {
            filters[ 'user_id' ] = values.userId;
        }
        if ( values.areaId ) {
            filters[ 'area_id' ] = values.areaId;
        }
        if ( values.assessmentName ) {
            filters[ 'observation_detail__assesment_name' ] = values.assessmentName;
        }

        console.log( filters );

        setFilters({
            filter: filters,
        });
        setPage( 1 );
    };

    useEffect(() => {
        getFilteredU({ filter: {}});
    }, [ ]);

    useEffect(() => {
        getFilteredA({ filter: {}});
    }, [ ]);
    

    return (
        <div style={{ boxSizing: "border-box", margin: "1rem 0" }}>
            <Form
                form = { form }
                onFinish = { onFinish }
                name = "ObservationFilter"
                layout = 'vertical'
            >
                <div className = 'autoGrid'>
                    <Form.Item name = "datetime"
                        label = "Fechas"
                    >
                        <RangePicker showTime />
                    </Form.Item>
                    <Form.Item name = "userId"
                        label = "Usuario"
                    >
                        <Select placeholder = "Seleccione usuario"
                            loading = { loadingU }
                            showSearch
                            allowClear
                            filterOption = {( input:string, option:any ) =>
                                ( option?.label ?? '' ).toLowerCase().includes( input.toLowerCase() )
                            }
                        >
                            {
                                users.map( user => (
                                    <Select.Option value = { user.id } key = { user.id }>
                                        {`${ user.name } ${ user.firstLastName } ${ user.secondLastName }`}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name = "areaId"
                        label = "Área"
                    >
                        <Select placeholder = "Seleccione área"
                            loading = { loadingA }
                            showSearch
                            allowClear
                            filterOption = {( input:string, option:any ) =>
                                ( option?.label ?? '' ).toLowerCase().includes( input.toLowerCase() )
                            }
                        >
                            {
                                areas.map( area => (
                                    <Select.Option value = { area.id } key = { area.id }>
                                        {`${ area.name }`}
                                    </Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name = "assessmentName"
                        label = "Nivel de Riesgo"
                    >
                        <Select placeholder = "Seleccione nivel de riesgo" 
                            allowClear
                        >
                            <Select.Option value = "Alto"> {`ALTO`} </Select.Option>
                            <Select.Option value = "Medio"> {`MEDIO`} </Select.Option>
                            <Select.Option value = "Bajo"> {`BAJO`} </Select.Option>
                        </Select>
                    </Form.Item>
                </div>
                <div style = {{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        type = 'primary'
                        htmlType = 'submit'
                    >
                        Filtrar
                    </Button>
                </div>
            </Form>
        </div>
    );
}
