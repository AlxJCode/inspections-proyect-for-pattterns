import { Divider, Space } from 'antd'
import React from 'react'
import { IInspectionDetailEvidence } from '../../../../interfaces/inspections/inspectionDetailEvidence';
import { ImageModal } from '../../../general/ImageModal'
import { RenderPercentage } from '../RenderPercentage';

interface Props {
    evidence: IInspectionDetailEvidence;
    index: number;
}

export const RenderEvidence = ({ evidence, index }: Props ) => {
    
    const text = `Evidencia ${ index + 1 }`

    return (
        <div style = {{ border: "1px solid var(--whitered-color)", padding: ".5rem", marginBottom: "0.5rem" }}>
            <Space>
                <ImageModal text = { text }  url = { evidence.evidence }/>
                <RenderPercentage percent = { evidence.percentage }/>
            </Space>
        </div>
    )
}
