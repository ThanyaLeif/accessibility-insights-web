// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { NamedFC } from 'common/react/named-fc';
import {
    FailedInstancePanel,
    FailedInstancePanelProps,
} from 'DetailsView/components/tab-stops/failed-instance-panel';
import * as React from 'react';

export interface ManualCheckFailedInstancePanelProps {
    algo: string;
}

export const ManualCheckFailedInstancePanel = NamedFC<ManualCheckFailedInstancePanelProps>(
    'ManualCheckFailedInstancePanel',
    props => {
        const failureInstanceProps: FailedInstancePanelProps = {
            headerText: `Add a failed instance for *insert the name here*`,
            isOpen: true,
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
