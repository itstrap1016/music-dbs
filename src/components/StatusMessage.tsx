function StatusMessage({
  isLoading,
  isError,
}: {
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading) {
    return (
      <div className="max-w-[814px] mx-auto mt-10 pb-10 flex justify-center items-center dark:text-gray-400">
        로딩중...⏳
      </div>
    );
  }
  if (isError) {
    return (
      <div className="max-w-[814px] mx-auto mt-10 pb-10 flex justify-center items-center dark:text-gray-400">
        에러가 발생했습니다 ❌
      </div>
    );
  }
}

export default StatusMessage;
