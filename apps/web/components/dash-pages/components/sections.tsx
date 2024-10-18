export const SectionHeader = ({ children }: React.PropsWithChildren) => {
  return <span className="flex flex-col gap-[4px]">{children}</span>;
};

export const SectionDescription = ({ children }: React.PropsWithChildren) => {
  return <span className="flex text-stone-500 text-sm">{children}</span>;
};

export const SectionTitle = ({ children }: React.PropsWithChildren) => {
  return <h2 className="font-bold text-xl leading-tighter">{children}</h2>;
};

export const Section = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex flex-col gap-2 md:w-[600px] max-md:w-full">
      {children}
    </div>
  );
};

export const SectionContent = ({ children }: React.PropsWithChildren) => {
  return <div className="flex flex-col">{children}</div>;
};
