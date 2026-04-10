import { useState } from 'react'
import './ImageUploadField.css'

interface ImageUploadFieldProps {
  photoUrl: string
  onPhotoUrlChange: (url: string) => void
}

type UploadMode = 'url' | 'upload'

export default function ImageUploadField({
  photoUrl,
  onPhotoUrlChange,
}: ImageUploadFieldProps) {
  const [mode, setMode] = useState<UploadMode>('url')
  const [preview, setPreview] = useState<string>(photoUrl)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    onPhotoUrlChange(url)
    if (url) {
      setPreview(url)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('❌ Please select a valid image file')
      return
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      alert('❌ Image size must be less than 5MB')
      return
    }

    setIsLoading(true)
    setUploadProgress(0)

    const reader = new FileReader()

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100
        setUploadProgress(progress)
      }
    }

    reader.onload = (event) => {
      const dataUrl = event.target?.result as string
      onPhotoUrlChange(dataUrl)
      setPreview(dataUrl)
      setUploadProgress(0)
      setIsLoading(false)
    }

    reader.onerror = () => {
      alert('❌ Failed to upload image')
      setIsLoading(false)
      setUploadProgress(0)
    }

    reader.readAsDataURL(file)
  }

  const handleClearImage = () => {
    onPhotoUrlChange('')
    setPreview('')
    setUploadProgress(0)
  }

  return (
    <div className="image-upload-field">
      {/* Mode Toggle */}
      <div className="upload-mode-toggle">
        <button
          type="button"
          className={`mode-btn ${mode === 'url' ? 'active' : ''}`}
          onClick={() => setMode('url')}
        >
          <i className="bi bi-link-45deg"></i>
          URL
        </button>
        <button
          type="button"
          className={`mode-btn ${mode === 'upload' ? 'active' : ''}`}
          onClick={() => setMode('upload')}
        >
          <i className="bi bi-upload"></i>
          Upload
        </button>
      </div>

      {/* URL Input Mode */}
      {mode === 'url' && (
        <div className="url-input-group">
          <label htmlFor="photoUrl">Photo URL</label>
          <div className="input-group">
            <i className="bi bi-link-45deg"></i>
            <input
              type="url"
              id="photoUrl"
              value={photoUrl}
              onChange={handleUrlChange}
              placeholder="https://example.com/image.jpg"
              className="form-control"
            />
          </div>
          <small className="text-muted">Provide a direct link to an image (JPEG, PNG, WebP, etc.)</small>
        </div>
      )}

      {/* File Upload Mode */}
      {mode === 'upload' && (
        <div className="file-upload-group">
          <label htmlFor="photoUpload">Upload Image</label>
          <div className="file-input-wrapper">
            <input
              type="file"
              id="photoUpload"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isLoading}
              className="file-input"
            />
            <div className="file-input-label">
              <i className="bi bi-cloud-arrow-up"></i>
              <span>Click to select or drag & drop</span>
              <small>Max 5MB (JPEG, PNG, WebP, GIF...)</small>
            </div>
          </div>

          {/* Upload Progress */}
          {isLoading && uploadProgress > 0 && (
            <div className="progress-wrapper">
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{ width: `${uploadProgress}%` }}
                  aria-valuenow={uploadProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
              <small>{Math.round(uploadProgress)}%</small>
            </div>
          )}
        </div>
      )}

      {/* Image Preview */}
      {preview && (
        <div className="image-preview">
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
          </div>
          <div className="preview-info">
            <span className="preview-label">Preview</span>
            <button type="button" className="btn-clear" onClick={handleClearImage} title="Remove image">
              <i className="bi bi-x-circle-fill"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
