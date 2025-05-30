#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
# Install NodeJS (https://docs.microsoft.com/en-us/visualstudio/containers/container-tools-react)
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
#RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
# END Install NodeJS

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
# Install NodeJS (https://docs.microsoft.com/en-us/visualstudio/containers/container-tools-react)
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
#RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
# END Install NodeJS
WORKDIR /src
COPY ["Orion/Orion.csproj", "Orion/"]
RUN dotnet restore "Orion/Orion.csproj"
COPY . .
WORKDIR "/src/Orion"
RUN dotnet build "Orion.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Orion.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Orion.dll"]
