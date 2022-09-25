FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine as build-env

WORKDIR /app

COPY *.csproj ./

RUN dotnet restore

COPY . ./

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine

WORKDIR /app

COPY --from=build-env /app/out .

EXPOSE 5001

ENTRYPOINT [ "dotnet", "server.dll" ]