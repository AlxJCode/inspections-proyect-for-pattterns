import { Form, Input, message, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAxiosArea } from '../../../../hooks/users/useAxiosArea';
import { useAxiosCompany } from '../../../../hooks/users/useAxiosCompany';
import { IArea } from '../../../../interfaces/users/area';
import { areaToJson } from '../../../../utils/transforms';

interface Props {
    openModalEditArea   : boolean;
    setOpenModalEditArea: React.Dispatch<React.SetStateAction<boolean>>;
    area                : IArea;
    setFilters          : React.Dispatch<React.SetStateAction<{}>>;
}

export const EditAreaForm = ({ area, openModalEditArea, setOpenModalEditArea, setFilters }: Props) => {

    const [ form ] = Form.useForm();

    const { companies, getFiltered, loading } = useAxiosCompany( );
    const { edit } = useAxiosArea()
    const [ loadingButton, setLoadingButton ] = useState( false );

    const onCancelModalEditArea = () => {
        setOpenModalEditArea( false );
    };

    const onFinish = async ( values: IArea ) => {

        if ( !area.id ) return;
        setLoadingButton( true );
        const newArea = areaToJson( values );
        try {
            const { status } = await edit( area.id , newArea );
            if ( status ) setLoadingButton( false );
            if ( status === 200 ) {
                message.success( 'Área editada correctamente.' );
            }
            onCancelModalEditArea();
            setFilters( { filter: {} } );
        } catch ( error ) {
            console.log( error );
            setLoadingButton( false );
        }
    };

    useEffect(() => {
        getFiltered({
            filter: {
                state: true,
            }
        });
    }, [ ]);
    
    useEffect(() => {
        if ( area ) {
            form.setFieldsValue( area );
        }
    }, [ area ]);

    return (
        <Modal
            title ="Editar área"
            open ={ openModalEditArea }
            onCancel ={ onCancelModalEditArea }
            onOk = { () => form.submit() }
            width = { 1000 }
            okButtonProps = {{ loading : loadingButton }}
        >
            <Form
                form = { form }
                name = 'EditArea'
                scrollToFirstError
                layout='vertical'
                requiredMark = "optional"
                onFinish = { onFinish }
            >  
                <div className = 'autoGrid'>
                    <Form.Item name = "name"
                        label = "Nombre"
                        hasFeedback
                        rules = {[
                            {
                                required: true,
                                message: 'Por favor, ingrsese el nombre.',
                            },
                        ]}
                    >
                        <Input placeholder = 'Ingrese el nombre' maxLength = { 100 }/>
                    </Form.Item>
                    <Form.Item name = "companyId" 
                        label = "Empresa"
                        hasFeedback
                    >
                        <Select placeholder = "Seleccione una empesa"
                            loading = { loading }
                        >
                            {
                                companies.map( company => (
                                    <Select.Option value = { company.id }>{ company.name }</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}
