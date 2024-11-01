export const Page = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex flex-col gap-8 w-full items-center mt-8">
      {children}
    </div>
  );
};
