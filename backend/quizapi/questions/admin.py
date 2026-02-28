from django.contrib import admin
from .models import Question, Answer, QuestionIssues, Rating
from django.db.models import Avg

class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 1

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'author', 'difficulty', 'created_at', 'rating_count', 'average_rating')
    list_filter = ('difficulty', 'status', 'author')
    search_fields = ('text',)
    inlines = [AnswerInline]
    ordering = ('-created_at',)

    def rating_count(self, obj):
        return obj.ratings.count()

    def average_rating(self, obj):
        return obj.ratings.aggregate(avg=Avg('rating'))['avg'] or 0

    rating_count.short_description = "Ratings"
    average_rating.short_description = "Avg Rating"

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('text', 'question', 'created_at')
    list_filter = ('question', 'created_at')
    search_fields = ('text', 'question__text')
    ordering = ('-created_at',)


@admin.register(QuestionIssues)
class QuestionIssuesAdmin(admin.ModelAdmin):
    list_display = ('status', 'question', 'description', 'decision')
    list_filter = ('status', 'decision')
    search_fields = ('question', 'status')
    ordering = ('status',)

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('rating', 'question')
    list_filster = ('rating', 'question')
    search_fields = ('question',)
    ordering = ('-rating',)