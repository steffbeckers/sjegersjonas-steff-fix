using Orion.Application.Errors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Orion.Infrastructure.Commands
{
    public static class CommandResult
    {
        public static CommandResult<T> Ok<T>(T data) =>
            new CommandResult<T>(data, true, null);

        public static CommandResult<T> Fail<T>(int errorCode, T data = default) =>
            new CommandResult<T>(data, false, errorCode);
    }

    public class CommandResult<T>
    {
        public T Data { get; set; }
        public string ErrorCode { get; set; }
        public string Message { get; set; }
        public bool IsSuccessful { get; set; }

        public CommandResult(T data, bool isSuccessful, int? errorCode)
        {
            Data = data;
            IsSuccessful = isSuccessful;
            if (errorCode != null)
            {
                var error = ErrorCodes.GetError((int)errorCode);
                Message = error.Value;
                ErrorCode = error.Key;
            }
        }
    }
}
