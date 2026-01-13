import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Time,
  Information,
  CheckmarkOutline,
  Checkmark,
  Close,
} from '@carbon/icons-react';

import { Button } from '../atoms/button';
import { Stack, HStack } from '../atoms/stack';
import { Text } from '../atoms/text';
import { SplitButton, type SplitButtonAction } from '../molecules/split-button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './alert-dialog';

const approvalBannerVariants = cva(
  'rounded-lg border border-l-4 bg-background p-4',
  {
    variants: {
      variant: {
        warning: 'border-l-warning border-border',
        info: 'border-l-info border-border',
        default: 'border-l-primary border-border',
      },
      layout: {
        stacked: '',
        inline:
          '[&>[data-slot=stack]]:flex-row [&>[data-slot=stack]]:items-center [&>[data-slot=stack]]:justify-between [&_[data-slot=approval-banner-content]]:min-w-0 [&_[data-slot=approval-banner-content]]:flex-1 [&_[data-slot=approval-banner-actions]]:shrink-0 [&_[data-slot=approval-banner-description]]:truncate',
      },
    },
    defaultVariants: {
      variant: 'warning',
      layout: 'stacked',
    },
  }
);

const textVariantMap = {
  warning: 'warning',
  info: 'info',
  default: 'primary',
} as const;

const iconMap = {
  warning: Time,
  info: Information,
  default: CheckmarkOutline,
};

type ConfirmationConfig = {
  /** Title of the confirmation dialog */
  title: string;
  /** Description of the confirmation dialog */
  description?: string;
  /** Custom content to render in the dialog body (below description) */
  content?: React.ReactNode;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Called when the dialog is cancelled/dismissed */
  onCancel?: () => void;
};

type ApprovalBannerProps = VariantProps<typeof approvalBannerVariants> & {
  /** Title of the approval banner */
  title: string;
  /** Description text */
  description: React.ReactNode;
  /** Callback when approve is confirmed */
  onApprove?: () => void | Promise<void>;
  /** Callback when reject is confirmed */
  onReject?: () => void | Promise<void>;
  /** Custom approve button text */
  approveText?: string;
  /** Custom reject button text */
  rejectText?: string;
  /** Whether approve action is loading */
  approveLoading?: boolean;
  /** Whether reject action is loading */
  rejectLoading?: boolean;
  /** Custom icon to display */
  icon?: React.ReactNode;
  /** Hide the reject button */
  hideReject?: boolean;
  /** Additional actions to show in dropdown (inline layout only) */
  additionalActions?: SplitButtonAction[];
  /** Confirmation dialog config for approve action. If provided, shows dialog before calling onApprove */
  approveConfirmation?: ConfirmationConfig;
  /** Confirmation dialog config for reject action. If provided, shows dialog before calling onReject */
  rejectConfirmation?: ConfirmationConfig;
};

function ApprovalBanner({
  variant = 'warning',
  layout = 'stacked',
  title,
  description,
  onApprove,
  onReject,
  approveText = 'Approve',
  rejectText = 'Reject',
  approveLoading = false,
  rejectLoading = false,
  icon,
  hideReject = false,
  additionalActions = [],
  approveConfirmation,
  rejectConfirmation,
}: ApprovalBannerProps) {
  const [approveDialogOpen, setApproveDialogOpen] = React.useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = React.useState(false);
  const [isApproving, setIsApproving] = React.useState(false);
  const [isRejecting, setIsRejecting] = React.useState(false);

  const IconComponent = iconMap[variant ?? 'warning'];
  const textVariant = textVariantMap[variant ?? 'warning'];
  const isLoading = approveLoading || rejectLoading || isApproving || isRejecting;

  const handleApproveClick = () => {
    if (approveConfirmation) {
      setApproveDialogOpen(true);
    } else {
      onApprove?.();
    }
  };

  const handleRejectClick = () => {
    if (rejectConfirmation) {
      setRejectDialogOpen(true);
    } else {
      onReject?.();
    }
  };

  const handleApproveConfirm = async () => {
    setIsApproving(true);
    try {
      await onApprove?.();
    } finally {
      setIsApproving(false);
      setApproveDialogOpen(false);
    }
  };

  const handleRejectConfirm = async () => {
    setIsRejecting(true);
    try {
      await onReject?.();
    } finally {
      setIsRejecting(false);
      setRejectDialogOpen(false);
    }
  };

  const handleApproveDialogChange = (open: boolean) => {
    setApproveDialogOpen(open);
    if (!open && !isApproving) {
      approveConfirmation?.onCancel?.();
    }
  };

  const handleRejectDialogChange = (open: boolean) => {
    setRejectDialogOpen(open);
    if (!open && !isRejecting) {
      rejectConfirmation?.onCancel?.();
    }
  };

  // Build dropdown actions for inline layout
  const dropdownActions: SplitButtonAction[] = React.useMemo(() => {
    const actions: SplitButtonAction[] = [];

    if (!hideReject) {
      actions.push({
        id: 'reject',
        label: rejectText,
        icon: <Close size={16} />,
        onClick: handleRejectClick,
        variant: 'destructive',
        separator: additionalActions.length > 0,
      });
    }

    return [...actions, ...additionalActions];
  }, [hideReject, rejectText, additionalActions, rejectConfirmation]);

  const isInline = layout === 'inline';

  const bannerContent = isInline ? (
    <div
      data-slot="approval-banner"
      className={approvalBannerVariants({ variant, layout })}
    >
      <HStack gap="3" align="start">
        <HStack gap="3" align="start" data-slot="approval-banner-content">
          <Text as="span" variant={textVariant}>
            {icon ?? <IconComponent size={20} />}
          </Text>
          <Stack gap="0">
            <Text
              size="sm"
              weight="medium"
              leading="tight"
              variant={textVariant}
            >
              {title}
            </Text>
            <Text
              as="span"
              size="sm"
              variant="muted"
              data-slot="approval-banner-description"
            >
              {description}
            </Text>
          </Stack>
        </HStack>
        <HStack data-slot="approval-banner-actions">
          {dropdownActions.length > 0 ? (
            <SplitButton
              onClick={handleApproveClick}
              disabled={isLoading}
              loading={approveLoading || isApproving}
              iconLeft={<Checkmark size={16} />}
              actions={dropdownActions}
            >
              {approveText}
            </SplitButton>
          ) : (
            <Button
              onClick={handleApproveClick}
              disabled={isLoading}
              loading={approveLoading || isApproving}
              iconLeft={<Checkmark size={16} />}
            >
              {approveText}
            </Button>
          )}
        </HStack>
      </HStack>
    </div>
  ) : (
    <div
      data-slot="approval-banner"
      className={approvalBannerVariants({ variant, layout })}
    >
      <HStack gap="3" align="start">
        <Text as="span" variant={textVariant}>
          {icon ?? <IconComponent size={20} />}
        </Text>
        <Stack gap="3">
          <Stack gap="1">
            <Text
              size="sm"
              weight="medium"
              leading="tight"
              variant={textVariant}
            >
              {title}
            </Text>
            <Text size="sm" variant="muted">
              {description}
            </Text>
          </Stack>
          <HStack gap="3">
            {!hideReject && (
              <Button
                variant="outline"
                onClick={handleRejectClick}
                disabled={isLoading}
                loading={rejectLoading || isRejecting}
                iconLeft={<Close size={16} />}
              >
                {rejectText}
              </Button>
            )}
            <Button
              onClick={handleApproveClick}
              disabled={isLoading}
              loading={approveLoading || isApproving}
              iconLeft={<Checkmark size={16} />}
            >
              {approveText}
            </Button>
          </HStack>
        </Stack>
      </HStack>
    </div>
  );

  return (
    <>
      {bannerContent}

      {/* Approve Confirmation Dialog */}
      <AlertDialog open={approveDialogOpen} onOpenChange={handleApproveDialogChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {approveConfirmation?.title ?? 'Confirm Approval'}
            </AlertDialogTitle>
            {approveConfirmation?.description && (
              <AlertDialogDescription>
                {approveConfirmation.description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          {approveConfirmation?.content}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isApproving}>
              {approveConfirmation?.cancelText ?? 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleApproveConfirm}
              loading={isApproving}
              disabled={isApproving}
            >
              {approveConfirmation?.confirmText ?? 'Approve'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Confirmation Dialog */}
      <AlertDialog open={rejectDialogOpen} onOpenChange={handleRejectDialogChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {rejectConfirmation?.title ?? 'Confirm Rejection'}
            </AlertDialogTitle>
            {rejectConfirmation?.description && (
              <AlertDialogDescription>
                {rejectConfirmation.description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          {rejectConfirmation?.content}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRejecting}>
              {rejectConfirmation?.cancelText ?? 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleRejectConfirm}
              loading={isRejecting}
              disabled={isRejecting}
            >
              {rejectConfirmation?.confirmText ?? 'Reject'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export { ApprovalBanner };
export type { ApprovalBannerProps, ConfirmationConfig };
