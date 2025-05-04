
from django.db import models

class Course(models.Model):
    """
    Model for storing course information.
    """
    LEVEL_CHOICES = (
        ('beginner', 'Débutant'),
        ('intermediate', 'Intermédiaire'),
        ('advanced', 'Avancé'),
    )
    
    title = models.CharField(max_length=255, verbose_name="Titre")
    description = models.TextField(verbose_name="Description")
    image = models.ImageField(upload_to='course_images/', blank=True, null=True, verbose_name="Image")
    language = models.CharField(max_length=50, verbose_name="Langage")
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, verbose_name="Niveau")
    duration = models.CharField(max_length=50, verbose_name="Durée")
    instructor = models.CharField(max_length=255, verbose_name="Instructeur")
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0, verbose_name="Note")
    reviews_count = models.PositiveIntegerField(default=0, verbose_name="Nombre d'avis")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de création")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Date de mise à jour")
    is_published = models.BooleanField(default=False, verbose_name="Est publié")
    learning_objectives = models.JSONField(null=True, blank=True, verbose_name="Objectifs d'apprentissage")
    
    class Meta:
        verbose_name = "Cours"
        verbose_name_plural = "Cours"
    
    def __str__(self):
        return self.title

class Module(models.Model):
    """
    Model for course modules.
    """
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules', verbose_name="Cours")
    title = models.CharField(max_length=255, verbose_name="Titre")
    description = models.TextField(blank=True, verbose_name="Description")
    order_num = models.PositiveIntegerField(verbose_name="Ordre")
    duration = models.CharField(max_length=50, verbose_name="Durée")
    
    class Meta:
        verbose_name = "Module"
        verbose_name_plural = "Modules"
        ordering = ['order_num']
        unique_together = ['course', 'order_num']
    
    def __str__(self):
        return f"{self.course.title} - Module {self.order_num}: {self.title}"

class Section(models.Model):
    """
    Model for module sections.
    """
    SECTION_TYPE_CHOICES = (
        ('video', 'Vidéo'),
        ('exercise', 'Exercice'),
        ('quiz', 'Quiz'),
    )
    
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='sections', verbose_name="Module")
    title = models.CharField(max_length=255, verbose_name="Titre")
    type = models.CharField(max_length=20, choices=SECTION_TYPE_CHOICES, verbose_name="Type")
    content = models.TextField(blank=True, verbose_name="Contenu")
    duration = models.CharField(max_length=50, verbose_name="Durée")
    order_num = models.PositiveIntegerField(verbose_name="Ordre")
    
    class Meta:
        verbose_name = "Section"
        verbose_name_plural = "Sections"
        ordering = ['order_num']
        unique_together = ['module', 'order_num']
    
    def __str__(self):
        return f"{self.module.title} - Section {self.order_num}: {self.title}"

class LearningPath(models.Model):
    """
    Model for learning paths (collections of courses).
    """
    title = models.CharField(max_length=255, verbose_name="Titre")
    description = models.TextField(verbose_name="Description")
    image = models.ImageField(upload_to='path_images/', blank=True, null=True, verbose_name="Image")
    slug = models.SlugField(unique=True, verbose_name="Slug")
    courses = models.ManyToManyField(Course, through='PathCourse', related_name='learning_paths', verbose_name="Cours")
    skill_level = models.CharField(max_length=50, verbose_name="Niveau de compétence")
    overview = models.TextField(verbose_name="Vue d'ensemble")
    benefits = models.JSONField(null=True, blank=True, verbose_name="Avantages")
    
    class Meta:
        verbose_name = "Parcours d'apprentissage"
        verbose_name_plural = "Parcours d'apprentissage"
    
    def __str__(self):
        return self.title

class PathCourse(models.Model):
    """
    Model for ordering courses in a learning path.
    """
    learning_path = models.ForeignKey(LearningPath, on_delete=models.CASCADE, verbose_name="Parcours d'apprentissage")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, verbose_name="Cours")
    order = models.PositiveIntegerField(default=0, verbose_name="Ordre")
    
    class Meta:
        verbose_name = "Cours du parcours"
        verbose_name_plural = "Cours du parcours"
        ordering = ['order']
        unique_together = ['learning_path', 'course']
    
    def __str__(self):
        return f"{self.learning_path.title} - {self.course.title}"
