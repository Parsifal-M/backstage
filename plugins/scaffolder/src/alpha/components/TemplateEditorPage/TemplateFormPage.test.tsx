/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { screen } from '@testing-library/react';
import { renderInTestApp, TestApiProvider } from '@backstage/test-utils';
import { TemplateFormPage } from './TemplateFormPage';
import { rootRouteRef } from '../../../routes';
import { catalogApiRef } from '@backstage/plugin-catalog-react';

describe('TemplateFormPage', () => {
  const catalogApiMock = { getEntities: jest.fn().mockResolvedValue([]) };

  it('Should render without exploding', async () => {
    await renderInTestApp(
      <TestApiProvider apis={[[catalogApiRef, catalogApiMock]]}>
        <TemplateFormPage />
      </TestApiProvider>,
      {
        mountedRoutes: {
          '/': rootRouteRef,
        },
      },
    );
    expect(
      screen.getByRole('heading', { name: 'Template Editor' }),
    ).toBeInTheDocument();
  });

  it('Should have an link back to the edit page', async () => {
    await renderInTestApp(
      <TestApiProvider apis={[[catalogApiRef, catalogApiMock]]}>
        <TemplateFormPage />
      </TestApiProvider>,
      {
        mountedRoutes: {
          '/': rootRouteRef,
        },
        routeEntries: ['/edit'],
      },
    );
    expect(
      screen.getByRole('link', { name: /Manage Templates/ }),
    ).toHaveAttribute('href', '/edit');
  });
});
