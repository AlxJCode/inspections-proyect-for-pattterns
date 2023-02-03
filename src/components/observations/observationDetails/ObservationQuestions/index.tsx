import React from 'react';
import { IObservationAnswer } from '../../../../interfaces/observations/observationAnswer';
import styles from '../styles.module.css';

interface Props {
    observationAnswers: IObservationAnswer[]
}

const RenderAnswer = ( o : IObservationAnswer ) => {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <div>
                { o.questionModel?.question }
            </div>
            <div style={{  marginTop: "0.5rem", fontWeight: "600" }}>
                { o.response }
            </div>
        </div>
    )
}

export const ObservationQuestions = ( { observationAnswers }: Props ) => {
    return (
        <div>
            <div className = { styles.title }>
                <span>Retroalimencatión</span>
            </div>
            {
                observationAnswers.map(o => (
                    RenderAnswer( o ) 
                ))
            }
        </div>
    )
}
