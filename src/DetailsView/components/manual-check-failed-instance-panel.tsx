// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { NamedFC } from 'common/react/named-fc';
import { AssessmentStoreData } from 'common/types/store-data/assessment-result-data';
import {
    FailedInstancePanel,
    FailedInstancePanelProps,
} from 'DetailsView/components/tab-stops/failed-instance-panel';
import * as React from 'react';

export type ManualCheckFailedInstancePanelDeps = {};
export interface ManualCheckFailedInstancePanelProps {
    assessmentStoreData: AssessmentStoreData;
    //something: string; //Add the needed properties here
}

export const ManualCheckFailedInstancePanel = NamedFC<ManualCheckFailedInstancePanelProps>(
    'ManualCheckFailedInstancePanel',
    props => {
        const failureInstanceProps: FailedInstancePanelProps = {
            headerText: `Add a failed instance for *insert the name here*`,
            isOpen: props.assessmentStoreData.isFailureInstancePanelOpen,
            instanceDescription: 'This is the description of the instance',
            confirmButtonText: 'Add a comment',
            onConfirm: () => {
                console.log('Confirm');
            },
            onChange: () => {
                console.log('Change');
            },
            onDismiss: () => {
                console.log('Dismiss');
            },
        };

        return <FailedInstancePanel {...failureInstanceProps} />;
    },
);
