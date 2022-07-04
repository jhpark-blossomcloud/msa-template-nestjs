## 시대생 NestJS 템플릿

### 🔹 소개
본 프로젝트는 시대생 환경 내에서 NestJS를 기반으로 하는 MSA 서비스를 빠르게 만들 수 있도록 다양한 기능이 미리 구현되어 있는 템플릿 프로젝트입니다.

### 🔹 기능
- 마스터 서버와 사용자 정보 연동
- 서비스 상태 체크
- JWT 사용자 인증
- Swagger 자동 생성
- `.env` 파일 자동 이용
- Docker Compose 기반 개발 환경
- Kubernetes 대응

### 🔹 최초 환경 설정
1. `.env.example` 파일을 `.env`으로 복사
2. `.env`에서 필요한 내용은 변경
3. `src/constants.ts`에 있는 `API_PREFIX`의 내용을 프로젝트에 맞게 변경
4. `k8s` 및 `.github` 폴더 내에 있는 설정 파일의 `template` 글자를 찾아 프로젝트에 맞게 변경

### 🔹 개발 환경 구축
**의존성 설치**
```bash
$ yarn
```
**개발용 서버 실행**
```bash
$ yarn start:dev
```
**Docker Compose를 사용하는 경우**
```bash
$ docker compose up -d
```

### 🔹 사용자 인증
1. 시대생 서비스 로그인
2. https://uoslife.com/api2/auth/token 접근하여 `access_token` 취득
3. `Authorization: Bearer ...`의 형태로 본 서비스 인증 처리
4. 사용자 정보는 마스터서버에 접근하여 자동으로 본 서비스에서 사용 가능

**아래와 같은 형태로 사용자 정보를 이용할 수 있음**

```typescript
...
import { Request } from '@infrastructure/types/request.type';

@Controller()
export class TestController {
  @Get()
  async testEndpoint(@Req() { user }: Request) {
    return user;
  }
}
```
