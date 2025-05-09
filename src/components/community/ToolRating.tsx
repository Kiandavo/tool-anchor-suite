
import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, Share } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';

interface ToolRatingProps {
  toolId: string;
  toolName: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  user: string;
  date: string;
}

export const ToolRating: React.FC<ToolRatingProps> = ({ toolId, toolName }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved reviews from localStorage
    const savedReviews = localStorage.getItem(`tool_reviews_${toolId}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [toolId]);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleRatingHover = (value: number) => {
    setHoverRating(value);
  };

  const handleCommentSubmit = () => {
    if (rating === 0) {
      toast({
        title: "امتیاز مورد نیاز است",
        description: "لطفاً قبل از ارسال نظر، امتیاز خود را نیز ثبت کنید.",
        variant: "destructive"
      });
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      rating,
      comment,
      user: "کاربر",
      date: new Date().toLocaleDateString('fa-IR')
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    
    // Save to localStorage
    localStorage.setItem(`tool_reviews_${toolId}`, JSON.stringify(updatedReviews));
    
    // Reset form
    setRating(0);
    setComment('');
    setShowCommentForm(false);
    
    toast({
      title: "نظر شما ثبت شد",
      description: "با تشکر از اینکه نظر خود را با ما به اشتراک گذاشتید."
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: toolName,
        url: window.location.href
      })
      .then(() => {
        toast({
          title: "اشتراک‌گذاری موفق",
          description: "این ابزار با موفقیت به اشتراک گذاشته شد."
        });
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "لینک کپی شد",
        description: "لینک این ابزار در کلیپ‌بورد کپی شد."
      });
    }
  };

  return (
    <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <h3 className="text-lg font-medium mb-4">نظرات و امتیازات</h3>
      
      {/* Rating Stars */}
      <div className="flex items-center mb-4">
        <div className="flex ml-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingClick(star)}
              onMouseEnter={() => handleRatingHover(star)}
              onMouseLeave={() => handleRatingHover(0)}
              className="ml-1 focus:outline-none"
            >
              <Star
                fill={(hoverRating || rating) >= star ? "gold" : "transparent"}
                color={(hoverRating || rating) >= star ? "gold" : "gray"}
                size={24}
              />
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-500">امتیاز دهید</span>
      </div>
      
      {/* Comment and Share Buttons */}
      <div className="flex space-x-2 rtl:space-x-reverse mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowCommentForm(!showCommentForm)}
          className="flex items-center"
        >
          <MessageCircle size={16} className="ml-1" />
          نظر دهید
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleShare}
          className="flex items-center"
        >
          <Share size={16} className="ml-1" />
          اشتراک‌گذاری
        </Button>
      </div>
      
      {/* Comment Form */}
      {showCommentForm && (
        <div className="mb-6 space-y-3 p-3 border rounded-md bg-white dark:bg-gray-800">
          <Textarea
            placeholder="نظر خود را بنویسید..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end space-x-2 rtl:space-x-reverse">
            <Button variant="ghost" onClick={() => setShowCommentForm(false)}>انصراف</Button>
            <Button onClick={handleCommentSubmit}>ارسال نظر</Button>
          </div>
        </div>
      )}
      
      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          <h4 className="text-sm font-medium border-b pb-2">نظرات کاربران</h4>
          {reviews.map((review) => (
            <div key={review.id} className="pb-3 border-b last:border-0">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="font-medium text-sm">{review.user}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        fill={i < review.rating ? "gold" : "transparent"}
                        color={i < review.rating ? "gold" : "gray"}
                        size={12}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-2">هنوز نظری برای این ابزار ثبت نشده است.</p>
      )}
    </div>
  );
};

export default ToolRating;
