FROM mcr.microsoft.com/dotnet/sdk:6.0-bullseye-slim as build
WORKDIR /app

COPY ["/API/API.csproj", "app/API/"]
COPY ["/Infrastructure/Infrastructure.csproj", "app/Infrastructure/"]
COPY ["/Domain/Domain.csproj", "app/Domain/"]
COPY ["/Application/Application.csproj", "app/Application/"]

RUN dotnet restore "app/API/API.csproj"

COPY . ./

WORKDIR "/app/API/"
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0-bullseye-slim
WORKDIR /app

COPY --from=build /app/API/out .

ENTRYPOINT [ "dotnet", "API.dll" ]