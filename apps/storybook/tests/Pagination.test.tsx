import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@trycompai/design-system';

describe('Pagination (via Table)', () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('does not log Base UI nativeButton warnings for multi-page pagination', () => {
    render(
      <Table
        pagination={{
          page: 3,
          pageCount: 10,
          onPageChange: () => {},
        }}
      >
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Row</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const allCalls = [...errorSpy.mock.calls, ...warnSpy.mock.calls]
      .map((args) => args.map((a) => String(a)).join(' '))
      .join('\n');

    expect(allCalls).not.toMatch(/nativeButton/i);
    expect(allCalls).not.toMatch(/acts as a button was not rendered as a native/i);
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
