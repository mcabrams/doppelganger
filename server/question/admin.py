from django.contrib import admin
from .models import Answer, AnsweredQuestion, Question


admin.site.register(Answer)
admin.site.register(AnsweredQuestion)
admin.site.register(Question)
