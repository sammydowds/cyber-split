export const Page = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex flex-col gap-4 w-full items-center mt-8">
      {children}
    </div>
  );
};
