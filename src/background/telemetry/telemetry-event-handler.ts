// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as _ from 'lodash';

import { ITab } from '../../common/itab';
import { TelemetryEventSource } from '../../common/telemetry-events';
import { BaseActionPayload } from '../actions/action-payloads';
import { BrowserAdapter } from '../browser-adapter';
import { TelemetryClient } from './telemetry-client';

export class TelemetryEventHandler {
    constructor(private readonly browserAdapter: BrowserAdapter, private readonly telemetryClient: TelemetryClient) {}

    public enableTelemetry(): void {
        this.telemetryClient.enableTelemetry();
    }

    public disableTelemetry(): void {
        this.telemetryClient.disableTelemetry();
    }

    public publishTelemetry(eventName: string, payload: BaseActionPayload, tabId: number): void {
        if (payload.telemetry == null) {
            return;
        }

        this.browserAdapter.getTab(tabId, (tab: ITab) => {
            if (tab === null) {
                return;
            }

            const telemetryInfo: any = payload.telemetry;
            this.addBasicDataToTelemetry(telemetryInfo);

            const flattenTelemetryInfo: IDictionaryStringTo<string> = this.flattenTelemetryInfo(telemetryInfo);
            this.telemetryClient.trackEvent(eventName, flattenTelemetryInfo);
        });
    }

    private addBasicDataToTelemetry(telemetryInfo: any): void {
        telemetryInfo.source = TelemetryEventSource[telemetryInfo.source];
    }

    private flattenTelemetryInfo(telemetryInfo: any): IDictionaryStringTo<string> {
        const flattenTelemetryInfo: IDictionaryStringTo<string> = _.mapValues(telemetryInfo, (value, key) => {
            if (typeof value !== 'string') {
                return JSON.stringify(value);
            }
            return value;
        });

        return flattenTelemetryInfo;
    }
}
