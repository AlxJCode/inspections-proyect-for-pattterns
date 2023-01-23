import { Button, Form, FormListFieldData, Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { IInspectionUser } from '../../../../interfaces/inspections/inspectionUser';
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
    inspectionUsers     : IInspectionUser[];
}

export const ResponsablesDetails = ({ responsableName, responsablePosition, responsableSignature, inspectionUsers }: Props) => {

    const [ form1 ] = Form.useForm();
    const [ form2 ] = Form.useForm();
    const [ form3 ] = Form.useForm();

    const  [ inspectedUsers, setinspectedUsers ] = useState<any>();
    const  [ inspectorUsers, setInspectorUsers ] = useState<any>();

    const startValues = ( inspectionUsers : IInspectionUser[] ) => {
        const inspectedUsers = inspectionUsers.map( i => {
            if ( i.type == "1" ) return {
                name: `${ i.userModel?.name || "-" } ${ i.userModel?.firstLastName || "-" } ${ i.userModel?.secondLastName || "-" }`,
                position: i.occupation,
                dni: i.dni
            }
        });
        const inspectordUsers = inspectionUsers.map( i => {
            if ( i.type == "0" ) return {
                name: `${ i.userModel?.name || "-" } ${ i.userModel?.firstLastName || "-" } ${ i.userModel?.secondLastName || "-" }`,
                position: i.occupation,
                dni: i.dni
            }
        });
        setInspectorUsers( { users: [...(inspectedUsers.filter( Boolean ))] } );
        setinspectedUsers( { users: [...(inspectordUsers.filter( Boolean ))] } );
    };

    useEffect(() => {
        startValues( inspectionUsers );
    }, [ inspectionUsers ]);

    useEffect(() => {
        form1.setFieldsValue({
            responsableName,
            responsablePosition,
            responsableSignature
        });
    }, [  ]);

    useEffect(() => {
        form2.setFieldsValue( inspectedUsers );
        form3.setFieldsValue( inspectorUsers );
    }, [ inspectedUsers, inspectorUsers ]);
    

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
                <span>Responsables del área inspeccionada</span>
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
            <div className = { styles.subtitle }>  
                <span>Equipo responsable de la inspección</span>
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
