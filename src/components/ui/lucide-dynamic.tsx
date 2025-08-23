import { FC, memo } from 'react';
import dynamic from 'next/dynamic';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { LucideProps } from 'lucide-react';

// Define a new type for the icon components that includes LucideProps
type LucideIconComponent = FC<LucideProps>;
export type IconName = keyof typeof dynamicIconImports;

const icons_components = {} as Record<IconName, LucideIconComponent>;

for (const name of Object.keys(dynamicIconImports) as IconName[]) {
    // The dynamic import returns a ComponentType which is compatible with our new type
    const NewIcon = dynamic(dynamicIconImports[name], { ssr: false, });
    icons_components[name] = NewIcon as LucideIconComponent;
}

type DynamicIconProps = { name: IconName; className?: string; };

const DynamicLucideIcon = memo(({ name, ...props }: DynamicIconProps) => {
    const Icon = icons_components[name];
    if (!Icon) return null;
    return <Icon {...props} />;
});

DynamicLucideIcon.displayName = 'DynamicLucideIcon';
export default DynamicLucideIcon;