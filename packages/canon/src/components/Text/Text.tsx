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

import React, { forwardRef } from 'react';
import { TextProps } from './types';
import { useTheme } from '../../theme/context';
import { getResponsiveValue } from '../../utils/getResponsiveValue';

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (props, ref) => {
    const {
      children,
      variant = 'body',
      weight = 'regular',
      ...restProps
    } = props;

    const { breakpoint } = useTheme();

    const responsiveVariant = getResponsiveValue(variant, breakpoint);
    const responsiveWeight = getResponsiveValue(weight, breakpoint);

    return (
      <p
        ref={ref}
        {...restProps}
        className={`text ${
          responsiveVariant ? `text-${responsiveVariant}` : ''
        } ${responsiveWeight ? `text-${responsiveWeight}` : ''}`}
      >
        {children}
      </p>
    );
  },
);

Text.displayName = 'Text';