import os
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse, FileResponse
from django_backend.settings import BASE_DIR

def index(request):
    print("Here is index = ", request)
    return render(request, 'index.html')

@csrf_exempt
def static(request):
    print("asdasdasdsad", request)
    pathes = request.path.split('/')[2:] # 문자열 들어온거 / 기준으로 스플릿
    def find_static_file(pathes):
        dir = os.path.join(BASE_DIR, 'pong/static/')
        for path in pathes:
            for dir_path, dir_name, file_name in os.walk(dir):
                if str(dir_path) == str(dir): # 디렉토리가 같으면
                    if path == pathes[-1]: # 마지막이면
                        if path in file_name: # 파일이름이 있으면
                            return os.path.join(dir_path, path)
                        return None
                    if path in dir_name: # 디렉토리 이름이 있으면
                        dir = os.path.join(dir, path) # 디렉토리 경로를 바꿔줌
                        break
                    return None

    file_path = find_static_file(pathes)
    content, type = None, None

    if file_path:
        try:
            with open(file_path, 'r') as f:
                content = f.read()
            if file_path.endswith('.html'):
                type = 'text/html'
            elif file_path.endswith('.css'):
                type = 'text/css'
            elif file_path.endswith('.js'):
                type = 'text/javascript'
            elif file_path.endswith('.png'):
                type = 'image/png'
            elif file_path.endswith('.jpg') or file_path.endswith('.jpeg'):
                type = 'image/jpeg'
            elif file_path.endswith('.svg'):
                type = 'image/svg+xml'
            elif file_path.endswith('.json'):
                type = 'application/json'
            else:
                type = 'text/plain'
        except Exception as e:
            print(e)
            content = None
    
    if content: # 파일이 있으면
        return HttpResponse(content, content_type=f'{type}; charset=utf8')
    return JsonResponse({"ok": False, "message": f"Error loading '{request.path}'"})
