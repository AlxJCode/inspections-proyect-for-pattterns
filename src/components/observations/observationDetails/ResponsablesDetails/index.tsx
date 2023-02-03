import { Button, Form, FormListFieldData, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { IObservationUser } from '../../../../interfaces/observations/observationUser';
import { ImageModal } from '../../../general/ImageModal';
import styles from '../styles.module.css';

const layout = {
    labelCol: {
        span: 4,
    },
};

interface Props {
    responsableName     : string;
    responsablePosition ?: string;
    responsableSignature?: string;
    observationUsers     : IObservationUser[];
}

export const ResponsablesDetails = ({ responsableName, responsablePosition, responsableSignature, observationUsers }: Props) => {

    const [ form1 ] = Form.useForm();
    const [ form2 ] = Form.useForm();
    const [ form3 ] = Form.useForm();

    const  [ observatedUsers, setObservatedUsers ] = useState<any>();
    const  [ ObservatorUsers, setObservatorUsers ] = useState<any>();

    const startValues = ( observationUsers : IObservationUser[] ) => {
        const observatedUsers = observationUsers.map( i => {
            if ( i.type == "1" ) return {
                name: `${ i.fullName }`,
                position: i.occupation,
                dni: i.dni
            }
        });
        const ObservatordUsers = observationUsers.map( i => {
            if ( i.type == "0" ) return {
                name: `${ i.fullName }`,
                position: i.occupation,
                dni: i.dni
            }
        });
        setObservatedUsers( { users: [...(observatedUsers.filter( Boolean ))] } );
        setObservatorUsers( { users: [...(ObservatordUsers.filter( Boolean ))] } );
    };

    useEffect(() => {
        startValues( observationUsers );
    }, [ observationUsers ]);

    useEffect(() => {
        form1.setFieldsValue({
            responsableName,
            responsablePosition,
            responsableSignature
        });
    }, [  ]);

    useEffect(() => {
        form2.setFieldsValue( observatedUsers );
        form3.setFieldsValue( ObservatorUsers );
    }, [ observatedUsers, ObservatorUsers ]);
    

    return (
        <div>
            <div className = { styles.title }>
                <span>Responsables</span>
            </div>
            <div className = { styles.subtitle }>  
                <span>Responsable del registro</span>
            </div>
            <Form
                { ...layout } 
                form = { form1 }
                labelAlign = "left"
                labelWrap
            >
                <div>
                    <Form.Item name = "responsableName"
                        label = "NOMBRE"
                    >
                        <Input  />
                    </Form.Item>
                    <Form.Item name = "responsablePosition"
                        label = "CARGO"
                    >
                        <Input  />
                    </Form.Item>
                    <Form.Item name = "responsableSignature"
                        label = "FIRMA"
                    >
                        <ImageModal text = 'Firma' url = { responsableSignature } />
                    </Form.Item>
                </div>
            </Form>
            <div className = { styles.subtitle }>  
                <span>Responsables del área observada</span>
            </div>
            <Form 
                form = { form2 }
                labelAlign = "left"
                labelWrap
            >
                <div>
                    <Form.List name="users" 
                    >
                        {(fields, { add, remove }) => (
                        <>
                            { fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key = { key }
                                    style = {{
                                    display: 'flex',
                                    marginBottom: 8,
                                    }}
                                    align = "baseline"
                                >
                                    <Form.Item
                                        { ...restField }
                                        name = {[name, 'name']}
                                        label = "Nombres"
                                        labelCol = {{ span: 8 }}
                                        style = {{ width: "400px" }}
                                    >
                                        <Input placeholder = "Nombres" />
                                    </Form.Item>
                                    <Form.Item
                                        { ...restField }
                                        name = {[name, 'dni']}
                                        label = "DNI"
                                        labelCol = {{ span: 8 }}
                                        style = {{ width: "400px" }}
                                    >
                                        <Input placeholder = "DNI" />
                                    </Form.Item>
                                    <Form.Item
                                        { ...restField }
                                        name = {[name, 'position']}
                                        label = "Cargo"
                                        labelCol = {{ span: 8 }}
                                        style = {{ width: "400px" }}
                                    >
                                        <Input placeholder = "Cargo" />
                                    </Form.Item>
                                </Space>
                            ))}
                            
                        </>
                        )}
                    </Form.List>
                </div>
            </Form>
            <div className = { styles.subtitle }>  
                <span>Equipo responsable de la observación</span>
            </div>
            <Form 
                form = { form3 }
                labelAlign = "left"
                labelWrap
            >
                <div>
                    <Form.List name="users" 

                    >
                        {(fields, { add, remove }) => (
                        <>
                            { fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key = { key }
                                    style = {{
                                    display: 'flex',
                                    marginBottom: 8,
                                    }}
                                    align = "baseline"
                                >
                                    <Form.Item
                                        { ...restField }
                                        name = {[name, 'name']}
                                        label = "Nombres"
                                        labelCol = {{ span: 8 }}
                                        style = {{ width: "400px" }}
                                    >
                                        <Input placeholder = "Nombres" />
                                    </Form.Item>
                                    <Form.Item
                                        { ...restField }
                                        name = {[name, 'dni']}
                                        label = "DNI"
                                        labelCol = {{ span: 8 }}
                                        style = {{ width: "400px" }}
                                    >
                                        <Input placeholder = "Nombres" />
                                    </Form.Item>
                                    <Form.Item
                                        { ...restField }
                                        name = {[name, 'position']}
                                        label = "Cargo"
                                        labelCol = {{ span: 8 }}
                                        style = {{ width: "400px" }}
                                    >
                                        <Input placeholder = "Cargo" />
                                    </Form.Item>
                                </Space>
                            ))}
                            
                        </>
                        )}
                    </Form.List>
                </div>
            </Form>
        </div>
    )
}
