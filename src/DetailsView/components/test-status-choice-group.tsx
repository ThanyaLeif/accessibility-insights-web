// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { isEqual } from 'lodash';
import { ChoiceGroup, IChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react';
import { Icon } from 'office-ui-fabric-react';
import { Link } from 'office-ui-fabric-react';
import * as React from 'react';

import { ManualTestStatus } from '../../common/types/manual-test-status';
import { VisualizationType } from '../../common/types/visualization-type';
import * as styles from './test-status-choice-group.scss';

export interface TestStatusChoiceGroupProps {
    test: VisualizationType; //Si es un test tipo heading, link, etc...
    step: string; //Maybe el paso del test en el que va, like (7.1 Links relacionados, or something)
    selector?: string;
    status: ManualTestStatus; //Si es unknow, pass or fail
    originalStatus: number;
    isLabelVisible?: boolean;
    onGroupChoiceChange: (status, test, step, selector?) => void; //Un metodo que va a necesitar saber el status del group, el tipo de test, el paso y el selector (lo que sea que eso signifique)
    onUndoClicked: (test, step, selector?) => void; //Un metodo que necesita saber el tipo de test, el paso y el selector
}

interface ChoiceGroupState {
    selectedKey: string;
    commentState: string; //voy a usar esto para saber si el comment es unknow | commented | new
}

export class TestStatusChoiceGroup extends React.Component<
    //Esta parte del codigo es similar a cuando especificas que una queue va a ser de strings -> queue<string>
    TestStatusChoiceGroupProps, //Estas son las props, que pueden tomar cualquier forma porque depende de la estructura de la clase
    ChoiceGroupState //Estos son los estados
> {
    protected choiceGroup: IChoiceGroup;

    constructor(props) {
        super(props);
        this.state = {
            selectedKey: ManualTestStatus[this.props.status], //Esto monitorea el cambio del boton  (unknow | pass | fail), ahora es capaz de usarlos como si fueran parte de la clase porque las pasamos en los brackets
            commentState: ManualTestStatus[this.props.status],
        };
    }

    //Este metodo checka si el estado de los botones cambio, pero no creo que sea relevante para el comment
    public componentDidUpdate(prevProps: Readonly<TestStatusChoiceGroupProps>): void {
        if (isEqual(prevProps, this.props) === false) {
            this.setState(() => ({ selectedKey: ManualTestStatus[this.props.status] }));
        }
    }

    public render(): JSX.Element {
        return (
            <div>
                <div className={styles.radioButtonGroup}>
                    <ChoiceGroup
                        className={ManualTestStatus[this.props.status]}
                        onChange={this.onChange}
                        componentRef={this.compomentRef}
                        selectedKey={this.state.selectedKey}
                        options={[
                            this.makeOption(ManualTestStatus.PASS, 'Pass'),
                            this.makeOption(ManualTestStatus.FAIL, 'Fail'),
                        ]}
                    />
                </div>

                <div>
                    {this.renderUndoButton()}
                    {this.renderCommentButton()}
                </div>
            </div>
        );
    }

    private makeOption(manualTestStatus: ManualTestStatus, text: string): IChoiceGroupOption {
        return {
            key: ManualTestStatus[manualTestStatus],
            text: text,
            ariaLabel: this.props.isLabelVisible ? undefined : text,
            onRenderLabel: this.onRenderOptionLabel,
        };
    }

    private onRenderOptionLabel = (option: IChoiceGroupOption): JSX.Element | null => {
        return (
            <span id={option.labelId} className={styles.radioLabel}>
                {this.props.isLabelVisible ? option.text : ''}
            </span>
        );
    };

    private renderUndoButton(): JSX.Element | null {
        if (this.props.originalStatus == null) {
            return null;
        }

        return (
            <Link className={styles.undoButton} onClick={this.onUndoClicked}>
                <Icon className={styles.undoButtonIcon} iconName="undo" ariaLabel={'undo'} />
            </Link>
        );
    }

    private renderCommentButton(): JSX.Element | null {
        //isAddCommentButtonEnabled: boolean = this.state.selectedKey == true;
        if (this.props.originalStatus == null) {
            return null;
        }
        return (
            <Link className={styles.undoButton} onClick={this.onCommentClicked}>
                {/* Change the icon to chat */}
                <Icon className={styles.undoButtonIcon} iconName="commentFill" ariaLabel={'undo'} />
            </Link>
        );
    }

    protected compomentRef = (component: IChoiceGroup): void => {
        this.choiceGroup = component;
    };

    protected onChange = (ev: React.FocusEvent<HTMLElement>, option: IChoiceGroupOption): void => {
        this.setState({ selectedKey: option.key });
        this.props.onGroupChoiceChange(
            ManualTestStatus[option.key],
            this.props.test,
            this.props.step,
            this.props.selector,
        );
    };

    protected onUndoClicked = (): void => {
        this.setState({ selectedKey: ManualTestStatus[ManualTestStatus.UNKNOWN] });
        this.choiceGroup.focus();
        this.props.onUndoClicked(this.props.test, this.props.step, this.props.selector);
    };

    protected onCommentClicked = (): void => {
        console.log('clicked');
        //Create method to open the side panel for the comment
    };
}
